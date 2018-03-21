const logger = require('../infrastructure/logger');

const healthCheck = (req, res) => {
  res.json({
    isAlive: true,
  });
};

const error = async (req, res) => {
  logger.warn('In test error endpoint');
  throw new Error('Test Error');
};

module.exports = {
  healthCheck,
  error,
};
