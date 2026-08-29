const { OAuth2Client } = require('google-auth-library');
const config = require('../config/env');
const ApiError = require('../utils/ApiError');

class GoogleAuthService {
  constructor() {
    this.client = new OAuth2Client();
  }

  /**
   * Verify Google ID token sent from frontend Google Identity Services
   * @param {string} idToken 
   * @returns {Promise<{googleId: string, email: string, emailVerified: boolean, name: string, picture: string, hd?: string}>}
   */
  async verifyIdToken(idToken) {
    if (!idToken) {
      throw new ApiError(400, 'Google ID token credential is required', 'MISSING_GOOGLE_CREDENTIAL');
    }

    try {
      // Determine target audience if GOOGLE_CLIENT_ID is set
      const audience = config.googleClientId || undefined;
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new ApiError(401, 'Invalid Google authentication token payload', 'INVALID_GOOGLE_TOKEN');
      }

      return {
        googleId: payload.sub,
        email: payload.email,
        emailVerified: payload.email_verified,
        name: payload.name || payload.email.split('@')[0],
        picture: payload.picture || '',
        hd: payload.hd, // Hosted domain (e.g. university.edu)
      };
    } catch (err) {
      if (err instanceof ApiError) throw err;
      console.error('Google token verification error:', err.message);
      throw new ApiError(401, 'Google credential verification failed. Please try signing in again.', 'GOOGLE_AUTH_FAILED');
    }
  }
}

module.exports = new GoogleAuthService();
