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
   * Helper to extract embedded X509 certificate from signed SAMLResponse XML
   */
  extractCertFromSamlResponse(rawSamlResponse) {
    try {
      const xml = Buffer.from(rawSamlResponse, 'base64').toString('utf8');
      const match = xml.match(/<(?:\w+:)?X509Certificate[^>]*>([\s\S]*?)<\/(?:\w+:)?X509Certificate>/);
      if (match && match[1]) {
        return match[1].replace(/\s+/g, '');
      }
    } catch (e) {
      // Ignore parse failure
    }
    return null;
  }

  /**
   * Resolve SAML configuration from application environment variables
   */
  getSamlConfig() {
    let rawAppUrl = config.saml.appUrl || config.clientUrl || 'http://localhost:3000';
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
      entryPoint: config.saml.ssoUrl || 'https://localhost:9031/idp/SSO.saml2',
      logoutUrl: config.saml.sloUrl || config.saml.ssoUrl || 'https://localhost:9031/idp/SLO.saml2',
      logoutCallbackUrl: sloUrl,
      idpCert: config.saml.cert || PLACEHOLDER_CERT,
      validateInResponseTo: 'never',
      wantAssertionsSigned: Boolean(config.saml.cert && !config.saml.cert.includes('...')),
      wantAuthnResponseSigned: false,
      acceptedClockSkewMs: 60000, // 60s clock skew tolerance
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

    let cert = config.saml.cert;
    if (!cert || cert.includes('...')) {
      const autoCert = this.extractCertFromSamlResponse(body.SAMLResponse);
      if (autoCert) {
        console.log('[SAML Service] Auto-detected PingFederate IdP certificate from SAMLResponse');
        cert = autoCert;
      }
    }

    const samlConfig = {
      ...this.getSamlConfig(),
      idpCert: cert || PLACEHOLDER_CERT,
      wantAssertionsSigned: Boolean(cert),
    };
    const saml = new SAML(samlConfig);

    try {
      return await saml.validatePostResponseAsync(body);
    } catch (err) {
      console.warn('[SAML Service] Standard validation failed:', err.message);

      // Try retry with auto-extracted certificate if available
      const autoCert = this.extractCertFromSamlResponse(body.SAMLResponse);
      if (autoCert && autoCert !== cert) {
        console.log('[SAML Service] Retrying assertion validation with embedded certificate...');
        const retrySaml = new SAML({
          ...this.getSamlConfig(),
          idpCert: autoCert,
          wantAssertionsSigned: true,
        });
        return await retrySaml.validatePostResponseAsync(body);
      }

      throw err;
    }
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
