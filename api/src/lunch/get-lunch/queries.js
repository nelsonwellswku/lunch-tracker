const moment = require('moment');
const db = require('../../infrastructure/database');

const getLunch = async ({ appUserId, date }) => {
  const startOfDay = moment.utc(date).startOf('day').format();
  const endOfDay = moment.utc(date).endOf('day').format();
  const lunch = await db.queryBuilder()
    .from('Lunch')
    .where('AppUserId', appUserId)
    .whereBetween('LunchDate', [startOfDay, endOfDay])
    .first('Location', 'Cost', 'Revisit');

  if (lunch) {
    return {
      whereDidYouEat: lunch.Location,
      howMuchDidYouPay: lunch.Cost,
      willYouGoBack: lunch.Revisit,
    };
  }

  return null;
};
module.exports = {
  getLunch,
};
