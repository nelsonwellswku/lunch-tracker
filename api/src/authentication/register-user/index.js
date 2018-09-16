const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');
const errors = require('../../infrastructure/errors');
const sgMail = require('@sendgrid/mail');
const db = require('../../infrastructure/database');
const { doesUserExist, createAppUser, createRegistrationToken } = require('./queries');

const registerUser = async (req, res) => {
  const { emailAddress, password } = req.body;

  const userExists = await doesUserExist(emailAddress);

  if (userExists) {
    throw new errors.Client(`Email address ${emailAddress} is not available.`);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.transaction(async (trx) => {
    const token = uuid();
    const appUserId = await createAppUser({ emailAddress, passwordHash }).transacting(trx);
    await createRegistrationToken(token, appUserId).transacting(trx);

    // TODO: send registration email here
    const link = `req.headers['Referer']/verify/${token}`;
  });

  res.sendStatus(201);
};

module.exports = registerUser;
