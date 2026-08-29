const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../config/env');
const ApiError = require('../utils/ApiError');
const User = require('../modules/users/user.model');
const { VERIFICATION_STATUS, USER_ROLES } = require('../constants/enums');

/**
 * Authentication Middleware - Ensures user is logged in
 */
const requireAuth = async (req, res, next) => {
  try {
    let token = req.cookies?.accessToken;

    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ApiError(401, 'Authentication required. Please sign in.', 'UNAUTHORIZED'));
    }

    const decoded = jwt.verify(token, config.jwtAccessSecret);

    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(decoded.id);
      if (!user) {
        return next(new ApiError(401, 'User account no longer exists', 'USER_NOT_FOUND'));
      }
      req.user = user;
    } else {
      req.user = {
        _id: decoded.id || 'mem_user_alex',
        name: 'Alex Rivera',
        email: 'alex.rivera@stanford.edu',
        verificationStatus: VERIFICATION_STATUS.VERIFIED,
        role: USER_ROLES.STUDENT,
      };
    }

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Session expired or invalid token', 'INVALID_TOKEN'));
    }
    next(error);
  }
};

/**
 * Verified Student Middleware (Required for listing creation)
 */
const requireVerifiedStudent = (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, 'Authentication required', 'UNAUTHORIZED'));
  }

  if (req.user.role === USER_ROLES.ADMIN) {
    return next();
  }

  if (req.user.verificationStatus !== VERIFICATION_STATUS.VERIFIED) {
    return next(
      new ApiError(
        403,
        'CampusShare listing creation requires a verified student status.',
        'STUDENT_VERIFICATION_REQUIRED'
      )
    );
  }

  next();
};

/**
 * Optional Auth Middleware
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token = req.cookies?.accessToken;
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (token && mongoose.connection.readyState === 1) {
      const decoded = jwt.verify(token, config.jwtAccessSecret);
      req.user = await User.findById(decoded.id);
    }
  } catch (err) {
    // Ignore error in optional auth
  }
  next();
};

module.exports = {
  requireAuth,
  requireVerifiedStudent,
  optionalAuth,
};
