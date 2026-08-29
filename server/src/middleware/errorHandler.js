const config = require('../config/env');

/**
 * Centralized Express Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let code = err.code || 'INTERNAL_SERVER_ERROR';
  let errors = err.errors || [];

  // Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid format for field '${err.path}'`;
    code = 'INVALID_ID_FORMAT';
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `A resource with that ${field} already exists`;
    code = 'DUPLICATE_RESOURCE';
  }

  // Mongoose ValidationError
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Database Validation Error';
    code = 'DB_VALIDATION_ERROR';
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  const response = {
    success: false,
    message,
    code,
    ...(errors.length > 0 && { errors }),
    ...(!config.isProduction && { stack: err.stack }),
  };

  if (!config.isProduction && statusCode === 500) {
    console.error('[Error Handler]', err);
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
