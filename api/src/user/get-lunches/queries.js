const db = require('../../infrastructure/database');

const getLunches = async ({
  appUserId,
  date,
  startDate,
  endDate,
}) => {
  const queryBuilder = db.queryBuilder()
    .from('Lunch as l')
    .join('revisit as r', 'r.revisitId', 'l.revisitId')
    .join('restaurant as re', 're.restaurantId', 'l.restaurantId')
    .where('appUserId', appUserId)
    .limit(31);

  if (date) {
    queryBuilder.where('l.lunchDate', date);
  }

  if (startDate && endDate) {
    queryBuilder.whereBetween('l.lunchDate', [startDate, endDate]);
  }

  const lunches = await queryBuilder
    .orderBy('l.lunchDate', 'desc')
    .select('l.lunchId', 're.restaurantName as location', 'l.cost', 'r.revisitName as revisit', 'l.lunchDate');

  return lunches;
};

module.exports = {
  getLunches,
};
