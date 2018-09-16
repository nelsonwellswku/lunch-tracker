const errors = require('../../infrastructure/errors');
const queries = require('./queries');

const verifyRegistrationToken = async (req, res) => {
  const { verificationToken } = req.body;
  const appUserId = await queries.getAppUserIdForVerificationToken(verificationToken);

  if (!appUserId) {
    throw new errors.Client('Registration token has expired.');
  }

  await queries.verifyUser(appUserId);

  return res.send();
};

module.exports = verifyRegistrationToken;
