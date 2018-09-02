const express = require('express');
const { celebrate, Joi } = require('celebrate');
const passport = require('../middleware/passport');
const handlers = require('./handlers');

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

// TODO: Add middleware here to enforce that the appUserId in the
// params of the route is the same as the logged in user's appUserId

router.get(
  '/:appUserId/lunch',
  celebrate({
    query: {
      date: Joi.date(),
    },
  }),
  handlers.getLunch,
);

router.post(
  '/:appUserId/lunch',
  celebrate({
    body: {
      location: Joi.string().required(),
      cost: Joi.number().precision(2),
      revisit: Joi.string().required(),
      date: Joi.date().required(),
    },
  }),
  handlers.saveLunch,
);

router.put(
  '/:appUserId/lunch/:lunchId',
  celebrate({
    body: {
      location: Joi.string().required(),
      cost: Joi.number().precision(2),
      revisit: Joi.string().required(),
      date: Joi.date().required(),
    },
  }),
  handlers.updateLunch,
);

module.exports = router;
