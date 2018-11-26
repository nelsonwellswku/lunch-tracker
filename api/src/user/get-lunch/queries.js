const db = require('../../infrastructure/database');
const { camelCaseKeys } = require('../../infrastructure/type-fns/object');

const getLunches = async ({
  appUserId,
  date,
  startDate,
  endDate,
}) => {
  const queryBuilder = db.queryBuilder()
    .from('Lunch')
    .limit(31)
    .where('AppUserId', appUserId);

  if (date) {
    queryBuilder.where('LunchDate', date);
  }

  if (startDate && endDate) {
    queryBuilder.whereBetween('LunchDate', [startDate, endDate]);
  }

  const lunches = await queryBuilder
    .orderBy('LunchDate', 'desc')
    .select('LunchId', 'Location', 'Cost', 'Revisit', 'LunchDate');

  return lunches.map(camelCaseKeys);
};

module.exports = {
  getLunches,
};
