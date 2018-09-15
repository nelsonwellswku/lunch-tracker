const express = require('express');
const { celebrate, Joi } = require('celebrate');
const handlers = require('./handlers');
const errors = require('../infrastructure/errors');

const router = express.Router();

const registerUserSchema = {
  body: Joi.object().keys({
    emailAddress: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    passwordConfirmation: Joi.string().min(8).required().valid(Joi.ref('password'))
      .options({
        language: {
          any: {
            allowOnly: '!!Passwords do not match',
          },
        },
      }),
  }),
};

router.post('/login', handlers.login);
router.get('/logout', handlers.logout);
router.post('/registerUser', celebrate(registerUserSchema, { abortEarly: false }), handlers.registerUser);
router.post('/resetPassword', handlers.resetPassword);
router.post('/verify-registration-token', (req, res) => { throw new errors.NotImplemented(); });

module.exports = router;
