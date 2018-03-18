const errors = require('../infrastructure/errors');
const logger = require('../infrastructure/logger');

const notFoundHandler = (req, res, next) => {
  res.status(404);
  res.send('Not Found');
  next();
};

const errorHandler = (err, req, res, next) => {
  logger.error(`Error handler: ${err}`);

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof errors.NotImplemented) {
    return res.status(501).send('Not Implemented');
  }

  return res
    .status(500)
    .send('Internal Server Error');
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
