const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');
const { sendResponse } = require('../utils/response');
const config = require('../config/env');

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: config.isProduction,
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

class AuthController {
  /**
   * POST /api/v1/auth/register
   */
  register = asyncHandler(async (req, res) => {
    const { user, token } = await authService.register(req.body);
    res.cookie('accessToken', token, COOKIE_OPTIONS);
    return sendResponse(res, 201, { user, token }, 'Registration successful');
  });

  /**
   * POST /api/v1/auth/login
   */
  login = asyncHandler(async (req, res) => {
    const { user, token } = await authService.login(req.body);
    res.cookie('accessToken', token, COOKIE_OPTIONS);
    return sendResponse(res, 200, { user, token }, 'Sign in successful');
  });

  /**
   * POST /api/v1/auth/firebase
   */
  firebaseLogin = asyncHandler(async (req, res) => {
    const { idToken } = req.body;
    const { user, token } = await authService.firebaseLogin(idToken);
    res.cookie('accessToken', token, COOKIE_OPTIONS);
    return sendResponse(res, 200, { user, token }, 'Firebase Google sign in successful');
  });

  /**
   * POST /api/v1/auth/google
   */
  googleLogin = asyncHandler(async (req, res) => {
    const { idToken } = req.body;
    const { user, token } = await authService.firebaseLogin(idToken);
    res.cookie('accessToken', token, COOKIE_OPTIONS);
    return sendResponse(res, 200, { user, token }, 'Google sign in successful');
  });

  /**
   * GET /api/v1/auth/me
   */
  me = asyncHandler(async (req, res) => {
    const user = await authService.getCurrentUser(req.user._id || req.user.id);
    return sendResponse(res, 200, { user }, 'Authenticated user profile retrieved');
  });

  /**
   * POST /api/v1/auth/logout
   */
  logout = asyncHandler(async (req, res) => {
    res.clearCookie('accessToken', COOKIE_OPTIONS);
    return sendResponse(res, 200, null, 'Signed out of CampusShare session');
  });

  /**
   * POST /api/v1/auth/forgot-password
   */
  forgotPassword = asyncHandler(async (req, res) => {
    const result = await authService.forgotPassword(req.body.email);
    return sendResponse(res, 200, null, result.message);
  });

  /**
   * POST /api/v1/auth/reset-password
   */
  resetPassword = asyncHandler(async (req, res) => {
    const result = await authService.resetPassword(req.body.token, req.body.password);
    return sendResponse(res, 200, null, result.message);
  });

  /**
   * POST /api/v1/auth/verify-email
   */
  verifyEmail = asyncHandler(async (req, res) => {
    const result = await authService.verifyEmail(req.body.token);
    return sendResponse(res, 200, null, result.message);
  });

  /**
   * POST /api/v1/auth/resend-verification
   */
  resendVerification = asyncHandler(async (req, res) => {
    const result = await authService.resendVerification(req.body.email);
    return sendResponse(res, 200, null, result.message);
  });
}

module.exports = new AuthController();
