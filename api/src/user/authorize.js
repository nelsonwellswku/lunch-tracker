const { pipe } = require('ramda');
const { Unauthorized } = require('../infrastructure/errors');

const authorize = (req, res, next) => {
  const { appUserId: paramsUserId } = req.params;
  const { appUserId: loggedInUserId } = req.user;

  const isValid = pipe(
    () => !!loggedInUserId,
    () => !!paramsUserId,
    () => paramsUserId === loggedInUserId,
  );

  if (!isValid()) {
    throw new Unauthorized();
  }

  next();
};

module.exports = authorize;
