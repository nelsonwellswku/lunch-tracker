const errors = require('../infrastructure/errors');
const logger = require('../infrastructure/logger');

const notFoundHandler = (req, res, next) => {
  res.sendStatus(404);
  next();
};

const joiErrorHandler = (err, req, res, next) => {
  if (!err.isJoi) {
    return next();
  }

  const response = {
    errors: err.details.map(detail => ({
      field: detail.context.key,
      message: detail.message,
    })),
  };

  res.status(400).json(response);
};

const errorHandler = (err, req, res, next) => {
  logger.error(`Error handler: ${err}`);

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof errors.Client) {
    return res.status(400).send({
      statusCode: 400,
      message: err.message,
      error: 'Bad Request',
    });
  }

  if (err instanceof errors.NotImplemented) {
    return res.sendStatus(501);
  }

  return res.sendStatus(500);
};

module.exports = {
  notFoundHandler,
  errorHandler,
  joiErrorHandler,
};
