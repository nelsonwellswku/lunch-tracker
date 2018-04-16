const express = require('express');
const { celebrate, Joi } = require('celebrate');
const passport = require('../middleware/passport');
const handlers = require('./handlers');

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get(
  '/lunch',
  celebrate({
    params: {
      userId: Joi.string().guid().required(),
      date: Joi.date().required(),
    },
  }),
  handlers.getLunch,
);
router.post(
  '/lunch',
  celebrate({
    body: {
      whereDidYouEat: Joi.string().required(),
      howMuchDidYouPay: Joi.string(),
      willYouGoBack: Joi.string().required(),
    },
  }),
  handlers.saveLunch,
);

module.exports = router;
