const registerUser = require('./register-user');
const login = require('./login');
const verifyRegistrationToken = require('./verify-registration-token');

module.exports = {
  login,
  registerUser,
  verifyRegistrationToken,
};
