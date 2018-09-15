const errors = require('../../infrastructure/errors');
const queries = require('./queries');

const verifyRegistrationToken = async (req, res) => {
  const { verificationToken } = req.body;
  const results = await queries.getAppUserIdForVerificationToken(verificationToken);

  if (!results) {
    throw new errors.Client('Registration token has expired.');
  }

  // TODO: Update the app user row in the db to flag it as verified

  return res.send();
};

module.exports = verifyRegistrationToken;
