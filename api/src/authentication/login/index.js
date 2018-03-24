const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const appConfig = require('../../infrastructure/application-configuration');
const errors = require('../../infrastructure/errors');
const queries = require('./queries');

const login = async (req, res) => {
  const { emailAddress, password } = req.body;
  const user = await queries.getUser(emailAddress);
  if (!user) {
    throw new errors.Client('Invalid username or password.');
  }

  const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordsMatch) {
    throw new errors.Client('Invalid username or password');
  }

  const jwtPayload = { userId: user.userId };
  jwt.sign(jwtPayload, appConfig.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
    res.send({ token });
  });
};

module.exports = login;
