const errors = require('../infrastructure/errors');
const registerUser = require('./register-user');

const login = (req, res) => {
  throw new errors.NotImplemented();
};

const logout = (req, res) => {
  throw new errors.NotImplemented();
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
