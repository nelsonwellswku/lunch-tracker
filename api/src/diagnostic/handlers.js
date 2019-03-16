const uuid = require('uuid/v4');
const logger = require('../infrastructure/logger');
const db = require('../infrastructure/database');

const healthCheck = (req, res) => {
  res.json({
    isAlive: true,
  });
};

const error = async (req, res) => {
  logger.warn('In test error endpoint');
  throw new Error('Test Error');
};

const testTransactions = async (req, res) => {
  await db.transaction(async (trx) => {
    await db.queryBuilder().insert({ EmailAddress: `${uuid()}@example.com`, PasswordHash: 'not_a_real_hash' }).into('AppUser').transacting(trx);
    await db.queryBuilder().insert({ EmailAddress: `${uuid()}@example.com`, PasswordHash: 'not_a_real_hash' }).into('AppUser').transacting(trx);
  });

  res.json({ success: true });
};

module.exports = {
  healthCheck,
  error,
  testTransactions,
};
