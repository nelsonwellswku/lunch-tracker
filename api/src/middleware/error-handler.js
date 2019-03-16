const errors = require('../infrastructure/errors');
const logger = require('../infrastructure/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`Error handler: ${err}`);

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof errors.Client) {
    return res.status(400).send({
      errors: [{
        message: err.message,
      }],
    });
  }

  if (err instanceof errors.Unauthorized) {
    return res.sendStatus(401);
  }

  if (err instanceof errors.NotImplemented) {
    return res.sendStatus(501);
  }

  return res.sendStatus(500);
};

module.exports = errorHandler;
