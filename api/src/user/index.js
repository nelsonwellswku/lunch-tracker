const express = require('express');
const { celebrate, Joi } = require('celebrate');
const passport = require('../middleware/passport');
const authorize = require('./authorize');
const handlers = require('./handlers');

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get(
  '/:appUserId/lunch',
  celebrate({
    query: {
      lunchDate: Joi.date(),
    },
  }),
  authorize,
  handlers.getLunch,
);

router.post(
  '/:appUserId/lunch',
  celebrate({
    body: {
      location: Joi.string().max(60).required(),
      cost: Joi.number().max(100.00).precision(2),
      revisit: Joi.string().valid('unsure', 'yes', 'no').required(),
      lunchDate: Joi.date().required(),
    },
  }),
  authorize,
  handlers.createLunch,
);

router.put(
  '/:appUserId/lunch/:lunchId',
  celebrate({
    body: {
      location: Joi.string().max(60).required(),
      cost: Joi.number().max(100.00).precision(2),
      revisit: Joi.string().valid('unsure', 'yes', 'no').required(),
      lunchDate: Joi.date().required(),
    },
  }),
  authorize,
  handlers.updateLunch,
);

module.exports = router;
