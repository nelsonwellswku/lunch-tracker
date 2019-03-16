const db = require('../../infrastructure/database');

const doesUserExist = async (emailAddress) => {
  const rows = await db.queryBuilder()
    .select('AppUserId')
    .from('AppUser')
    .where({ EmailAddress: emailAddress })
    .limit(1);

  return rows.length > 0;
};

const createAppUser = (trx, newUser) => db
  .queryBuilder()
  .insert({
    EmailAddress: newUser.emailAddress,
    PasswordHash: newUser.passwordHash,
  })
  .into('AppUser')
  .returning('AppUserId')
  .transacting(trx);

const createRegistrationToken = (trx, token, appUserId) => db
  .queryBuilder()
  .insert({
    AppUserId: appUserId,
    Token: token,
  })
  .into('RegistrationToken')
  .transacting(trx);

module.exports = {
  doesUserExist,
  createAppUser,
  createRegistrationToken,
};
