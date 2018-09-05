const {
  compose,
  curry,
  fromPairs,
  map,
  toPairs,
} = require('ramda');

const { camelCase } = require('./string');

const transformFirst = curry((fn, arr) => [
  fn(arr[0]),
  arr[1],
]);

const camelCasePairKey = map(transformFirst(camelCase));

const camelCaseKeys = compose(
  fromPairs,
  camelCasePairKey,
  toPairs,
);

module.exports = {
  camelCaseKeys,
};
