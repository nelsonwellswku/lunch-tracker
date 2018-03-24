const db = require('../../infrastructure/database');

const doesUserExist = async (emailAddress) => {
  const rows = await db.queryBuilder()
    .select('AppUserId')
    .from('AppUser')
    .where({ EmailAddress: emailAddress })
    .limit(1);

  return rows.length > 0;
};

const createAppUser = newUser => db
  .queryBuilder()
  .insert({
    EmailAddress: newUser.emailAddress,
    PasswordHash: newUser.passwordHash,
  })
  .into('AppUser');

module.exports = {
  doesUserExist,
  createAppUser,
};
