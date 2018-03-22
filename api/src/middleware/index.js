const joiErrorHandler = require('./joi-error-handler');
const errorHandler = require('./error-handler');
const notFoundHandler = require('./not-found-handler');

module.exports = {
  notFoundHandler,
  joiErrorHandler,
  errorHandler,
};
