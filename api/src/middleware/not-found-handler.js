const logger = require('../infrastructure/logger');

const notFoundHandler = (req, res, next) => {
  logger.warn(`Could not find route for ${req.originalUrl}.`);

  res.sendStatus(404);
  next();
};

module.exports = notFoundHandler;
