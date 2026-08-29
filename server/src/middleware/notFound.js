const ApiError = require('../utils/ApiError');

/**
 * 404 Route Not Found Middleware
 */
const notFound = (req, res, next) => {
  next(new ApiError(404, `Cannot ${req.method} ${req.originalUrl}`, 'ROUTE_NOT_FOUND'));
};

module.exports = notFound;
