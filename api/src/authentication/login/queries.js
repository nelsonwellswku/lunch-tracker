const db = require('../../infrastructure/database');

const getUser = async (emailAddress) => {
  const user = await db.queryBuilder()
    .first('UserId', 'PasswordHash')
    .from('AppUser')
    .where({ EmailAddress: emailAddress });

  if (user) {
    return {
      userId: user.UserId,
      passwordHash: user.PasswordHash,
    };
  }

  return null;
};

module.exports = {
  getUser,
};
