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

const verifyUser = appUserId => db
  .queryBuilder()
  .into('AppUser')
  .where('AppUserId', appUserId)
  .update('Verified', 1);

module.exports = {
  getAppUserIdForVerificationToken,
  verifyUser,
};
