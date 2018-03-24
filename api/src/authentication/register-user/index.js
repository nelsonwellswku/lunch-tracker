const bcrypt = require('bcrypt');
const errors = require('../../infrastructure/errors');
const { doesUserExist, createAppUser } = require('./queries');

const registerUser = async (req, res) => {
  const { emailAddress, password } = req.body;

  const userExists = await doesUserExist(emailAddress);

  if (userExists) {
    throw new errors.Client(`Email address ${emailAddress} is not available.`);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await createAppUser({ emailAddress, passwordHash });

  res.sendStatus(201);
};

module.exports = registerUser;
