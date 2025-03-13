const logger = require('./logger');

function errorHandler(err, req, res, next) {
  logger.error(err.message, {
    stack: err.stack,
  });
  return res.status(500).json({
    error: 'An internal server error occurred',
  });
}

module.exports = errorHandler;
