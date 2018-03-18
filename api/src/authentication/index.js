const express = require('express');
const { celebrate, Joi } = require('celebrate');
const handlers = require('./handlers');

const router = express.Router();

const registerUserBodySchema = Joi.object().keys({
  emailAddress: Joi.string().email().required(),
  password: Joi.string().required(),
  passwordConfirmation: Joi.string().required().valid(Joi.ref('password')).options({
    language: {
      any: {
        allowOnly: '!!Passwords do not match',
      },
    },
  }),
});

router.post('/login', handlers.login);
router.get('/logout', handlers.logout);
router.post('/registerUser', celebrate({
  body: registerUserBodySchema,
}), handlers.registerUser);
router.post('/resetPassword', handlers.resetPassword);

module.exports = router;
