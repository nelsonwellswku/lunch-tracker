const express = require('express');
const { celebrate, Joi } = require('celebrate');
const passport = require('../middleware/passport');
const handlers = require('./handlers');

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get(
  '/',
  celebrate({
    query: {
      restaurantName: Joi.string(),
    },
  }),
  handlers.getRestaurants,
);

module.exports = router;
