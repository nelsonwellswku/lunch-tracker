const db = require('../../infrastructure/database');
const { camelCaseKeys } = require('../../infrastructure/type-fns/object');

const getLunch = async ({ appUserId, date }) => {
  const queryBuilder = db.queryBuilder()
    .from('Lunch')
    .limit(10)
    .where('AppUserId', appUserId);

  if (date) {
    queryBuilder.where('LunchDate', date);
  }

  const lunches = await queryBuilder
    .orderBy('LunchDate', 'desc')
    .select('LunchId', 'Location', 'Cost', 'Revisit', 'LunchDate');

  return lunches.map(camelCaseKeys);
};

module.exports = {
  getLunch,
};
