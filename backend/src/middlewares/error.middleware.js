/* src/middlewares/error.middleware.js */
const logger = require('../utils/customLogger');

const errorMiddleware = (err, _req, res, _next) => {
  if (err.isBoom) {
    const boomError = err;
    
    logger.warn('BoomError', 'Handled Boom error', boomError.message);
    
    return res.status(boomError.output.statusCode).json({
      statusCode: boomError.output.statusCode,
      error: boomError.output.payload.error,
      message: boomError.message,
    });
  }

  logger.error('ErrorMiddleware', 'Unhandled error', err.message || 'Internal Server Error');

  return res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    statusCode: err.status || 500,
  });
};

module.exports = errorMiddleware;