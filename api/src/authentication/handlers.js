const bcrypt = require('bcrypt');
const errors = require('../infrastructure/errors');
const db = require('../infrastructure/database');

const login = (req, res) => {
  throw new errors.NotImplemented();
};

const logout = (req, res) => {
  throw new errors.NotImplemented();
};

const registerUser = async (req, res) => {
  const { emailAddress, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  await db.queryBuilder().insert({
    EmailAddress: emailAddress,
    PasswordHash: passwordHash,
  }).into('AppUser');

  res.sendStatus(201);
};

const resetPassword = (req, res) => {
  throw new errors.NotImplemented();
};

module.exports = {
  login,
  logout,
  registerUser,
  resetPassword,
};
