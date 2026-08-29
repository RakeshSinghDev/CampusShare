const ApiError = require('../utils/ApiError');

/**
 * Zod Schema Validation Middleware Helper
 * @param {Object} schemas - { body?, params?, query? } Zod schemas
 */
const validate = (schemas) => async (req, res, next) => {
  try {
    if (schemas.body) {
      req.body = await schemas.body.parseAsync(req.body);
    }
    if (schemas.params) {
      req.params = await schemas.params.parseAsync(req.params);
    }
    if (schemas.query) {
      req.query = await schemas.query.parseAsync(req.query);
    }
    next();
  } catch (error) {
    if (error.name === 'ZodError') {
      const formattedErrors = error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      return next(new ApiError(400, 'Validation Failed', 'VALIDATION_ERROR', formattedErrors));
    }
    next(error);
  }
};

module.exports = validate;
