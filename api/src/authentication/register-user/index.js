const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');
const errors = require('../../infrastructure/errors');
const db = require('../../infrastructure/database');
const { doesUserExist, createAppUser, createRegistrationToken } = require('./queries');
const sendMail = require('./send-mail');

const registerUser = async (req, res) => {
  const { emailAddress, password } = req.body;

  const userExists = await doesUserExist(emailAddress);

  if (userExists) {
    throw new errors.Client(`Email address ${emailAddress} is not available.`);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.transaction(async (trx) => {
    const token = uuid();
    const appUserId = await createAppUser(trx, { emailAddress, passwordHash });
    await createRegistrationToken(trx, token, appUserId);

    const referer = req.get('referer');
    const link = `${referer}/verify/${token}`;
    await sendMail({
      to: emailAddress,
      from: 'lunchtracker@example.com', // obviously not
      subject: 'Complete your lunch tracker registration',
      text: `Visit this URL to complete registration: ${link}

Thanks,

Lunchtracker`,
    });
  });

  res.sendStatus(201);
};

module.exports = registerUser;
