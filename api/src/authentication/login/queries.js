const db = require('../../infrastructure/database');

const getUser = async (emailAddress) => {
  const user = await db.queryBuilder()
    .first('AppUserId', 'PasswordHash')
    .from('AppUser')
    .where({
      EmailAddress: emailAddress,
      Verified: true,
    });

  if (user) {
    return {
      appUserId: user.AppUserId,
      passwordHash: user.PasswordHash,
    };
  }

  return null;
};

module.exports = {
  getUser,
};
