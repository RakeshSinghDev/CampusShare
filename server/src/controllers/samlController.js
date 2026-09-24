const samlService = require('../services/samlService');
const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');
const config = require('../config/env');

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: config.isProduction,
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const CLEAR_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: config.isProduction,
  sameSite: 'lax',
};

const getClientBaseUrl = () => {
  let url = config.clientUrl || config.saml.appUrl || 'http://localhost:3000';
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }
  return url.replace(/\/+$/, '');
};

class SamlController {
  /**
   * GET /api/auth/saml/login
   * Initiates SP-initiated SAML 2.0 SSO authentication request.
   */
  login = asyncHandler(async (req, res) => {
    const clientUrl = getClientBaseUrl();
    try {
      const relayState = req.query.relayState || req.query.redirect || '';
      const authorizeUrl = await samlService.getAuthorizeUrl(req, relayState);
      return res.redirect(authorizeUrl);
    } catch (err) {
      console.error('[SAML SSO] Login initiation error:', err.message);
      return res.redirect(`${clientUrl}/login?error=${encodeURIComponent(err.message)}`);
    }
  });

  /**
   * POST /api/auth/saml/acs
   * Assertion Consumer Service endpoint. Receives SAMLResponse from PingFederate IdP.
   */
  acs = asyncHandler(async (req, res) => {
    const clientUrl = getClientBaseUrl();

    try {
      const { profile } = await samlService.validatePostResponse(req.body);

      if (!profile) {
        throw new Error('SAML authentication returned an empty profile.');
      }

      // Extract attributes from SAML Assertion
      const email =
        profile.email ||
        profile.mail ||
        profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ||
        profile.SAML_SUBJECT ||
        profile.nameID;

      const firstName =
        profile.firstName ||
        profile.givenName ||
        profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'] ||
        '';

      const lastName =
        profile.lastName ||
        profile.surname ||
        profile.sn ||
        profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'] ||
        '';

      // Find or auto-provision the student account in database
      const { user, token } = await authService.samlLogin({
        email,
        firstName,
        lastName,
        nameID: profile.nameID,
        attributes: {
          ...(profile.attributes || {}),
          ...profile,
        },
      });

      // Establish authenticated session via HTTP-only JWT cookie
      res.cookie('accessToken', token, COOKIE_OPTIONS);

      // Determine redirect destination from RelayState
      const relayState = req.body.RelayState;
      let targetUrl = `${clientUrl}/home`;

      if (relayState && typeof relayState === 'string') {
        if (relayState.startsWith('/')) {
          targetUrl = `${clientUrl}${relayState}`;
        } else if (relayState.startsWith('http://') || relayState.startsWith('https://')) {
          targetUrl = relayState;
        }
      }

      // Append token to URL so client localStorage can immediately sync Bearer token
      const separator = targetUrl.includes('?') ? '&' : '?';
      return res.redirect(`${targetUrl}${separator}token=${encodeURIComponent(token)}&sso=true`);
    } catch (err) {
      console.error('[SAML SSO] ACS callback processing error:', err.message);
      return res.redirect(`${clientUrl}/login?error=${encodeURIComponent(err.message)}`);
    }
  });

  /**
   * GET /api/auth/saml/logout
   * Handles SP-initiated Single Logout (SLO).
   */
  logout = asyncHandler(async (req, res) => {
    res.clearCookie('accessToken', CLEAR_COOKIE_OPTIONS);
    const clientUrl = getClientBaseUrl();

    try {
      const user = req.user || {};
      const logoutUrl = await samlService.getLogoutUrl(user);
      if (logoutUrl) {
        return res.redirect(logoutUrl);
      }
    } catch (err) {
      console.warn('[SAML SLO] Single Logout generation notice:', err.message);
    }

    return res.redirect(`${clientUrl}/login?loggedOut=true`);
  });

  /**
   * GET & POST /api/auth/saml/slo
   * Single Logout callback endpoint for PingFederate IdP-initiated and SP-initiated logout.
   */
  slo = asyncHandler(async (req, res) => {
    res.clearCookie('accessToken', CLEAR_COOKIE_OPTIONS);
    const clientUrl = getClientBaseUrl();
    return res.redirect(`${clientUrl}/login?loggedOut=true`);
  });

  /**
   * GET /api/auth/saml/metadata
   * Exports Service Provider (SP) SAML 2.0 metadata XML for PingFederate SP Connection.
   */
  metadata = asyncHandler(async (req, res) => {
    try {
      const xml = samlService.getMetadata();
      res.set('Content-Type', 'application/xml');
      return res.status(200).send(xml);
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  });
}

module.exports = new SamlController();
