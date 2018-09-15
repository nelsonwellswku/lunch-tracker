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
  .into('AppUser')
  .returning('AppUserId');

const createRegistrationToken = (token, appUserId) => db
  .queryBuilder()
  .insert({
    AppUserId: appUserId,
    Token: token,
  })
  .into('RegistrationToken');

module.exports = {
  doesUserExist,
  createAppUser,
  createRegistrationToken,
};
