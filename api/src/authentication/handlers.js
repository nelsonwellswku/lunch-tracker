const errors = require('../infrastructure/errors');
const registerUser = require('./register-user');
const login = require('./login');

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
