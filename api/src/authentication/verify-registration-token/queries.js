const db = require('../../infrastructure/database');

const getAppUserIdForVerificationToken = async (verificationToken) => {
  const [row] = await db
    .queryBuilder()
    .select('AppUserId')
    .from('RegistrationToken')
    .where({ Token: verificationToken })
    .limit(1);

  if (row) {
    return row.AppUserId;
  }

  return null;
};

module.exports = {
  getAppUserIdForVerificationToken,
};
