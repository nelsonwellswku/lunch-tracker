const {
  compose,
  fromPairs,
  map,
  adjust,
  toPairs,
} = require('ramda');
const { camelCase } = require('./string');

const camelCasePairKey = map(adjust(camelCase, 0));

const camelCaseKeys = compose(
  fromPairs,
  camelCasePairKey,
  toPairs,
);

module.exports = {
  camelCaseKeys,
};
