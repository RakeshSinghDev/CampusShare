const { SAML } = require('@node-saml/node-saml');
const config = require('../config/env');

// Placeholder certificate used for SP metadata generation when PINGFEDERATE_CERT is not yet populated
const PLACEHOLDER_CERT =
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0r1W4gV5J8SjY+6wK5jG';

class SamlService {
  constructor() {
    this.samlInstance = null;
  }

  /**
   * Resolve SAML configuration from application environment variables
   */
  getSamlConfig() {
    let rawAppUrl = config.saml.appUrl || config.clientUrl || 'https://campushare-9fqqlncs7-rakesh-d282.vercel.app';
    if (!rawAppUrl.startsWith('http://') && !rawAppUrl.startsWith('https://')) {
      rawAppUrl = `https://${rawAppUrl}`;
    }
    const appUrl = rawAppUrl.replace(/\/+$/, '');
    const spEntityId = config.saml.spEntityId || appUrl;
    const acsUrl = `${appUrl}/api/auth/saml/acs`;
    const sloUrl = `${appUrl}/api/auth/saml/slo`;

    return {
      issuer: spEntityId,
      callbackUrl: acsUrl,
      entryPoint: config.saml.ssoUrl || 'https://placeholder-idp.example.com/idp/SSO.saml2',
      logoutUrl: config.saml.sloUrl || config.saml.ssoUrl || 'https://placeholder-idp.example.com/idp/SLO.saml2',
      logoutCallbackUrl: sloUrl,
      idpCert: config.saml.cert || PLACEHOLDER_CERT,
      validateInResponseTo: 'never',
      wantAssertionsSigned: Boolean(config.saml.cert),
      acceptedClockSkewMs: 10000, // 10s clock skew tolerance
      identifierFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
      audience: spEntityId,
    };
  }

  /**
   * Retrieve active SAML instance
   */
  getInstance() {
    if (!this.samlInstance) {
      const samlConfig = this.getSamlConfig();
      this.samlInstance = new SAML(samlConfig);
    }
    return this.samlInstance;
  }

  /**
   * Reset instance if environment settings are updated
   */
  reload() {
    this.samlInstance = null;
    return this.getInstance();
  }

  /**
   * Generate SAML 2.0 AuthNRequest redirect URL for PingFederate SSO
   * @param {Object} req - Express request
   * @param {string} relayState - Optional target redirect or state
   */
  async getAuthorizeUrl(req = {}, relayState = '') {
    if (!config.saml.ssoUrl) {
      throw new Error(
        'PingFederate SSO URL is not configured. Please set PINGFEDERATE_SSO_URL in your server environment variables.'
      );
    }
    const saml = this.getInstance();
    return await saml.getAuthorizeUrlAsync(relayState || '', req.headers?.host || null, {});
  }

  /**
   * Validate SAML 2.0 HTTP POST response from PingFederate Assertion Consumer Service
   * @param {Object} body - Parsed form body containing SAMLResponse
   */
  async validatePostResponse(body) {
    if (!body || !body.SAMLResponse) {
      throw new Error('SAML POST callback is missing SAMLResponse payload.');
    }
    if (!config.saml.cert) {
      throw new Error(
        'PingFederate public certificate is not configured. Please set PINGFEDERATE_CERT in your server environment variables.'
      );
    }
    const saml = this.getInstance();
    return await saml.validatePostResponseAsync(body);
  }

  /**
   * Generate Single Logout (SLO) redirect URL to PingFederate
   * @param {Object} user - User object or profile
   * @param {string} relayState
   */
  async getLogoutUrl(user = {}, relayState = '') {
    if (!config.saml.sloUrl) {
      return null;
    }
    const saml = this.getInstance();
    const logoutSubject = {
      nameID: user.samlId || user.email || (typeof user === 'string' ? user : ''),
      nameIDFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
      sessionIndex: user.sessionIndex || undefined,
    };
    return await saml.getLogoutUrlAsync(logoutSubject, relayState || '');
  }

  /**
   * Generate Service Provider SAML 2.0 Metadata XML
   */
  getMetadata() {
    const saml = this.getInstance();
    return saml.generateServiceProviderMetadata();
  }
}

module.exports = new SamlService();
