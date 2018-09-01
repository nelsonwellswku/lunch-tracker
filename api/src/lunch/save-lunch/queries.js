const moment = require('moment');
const db = require('../../infrastructure/database');

const createLunch = async (lunch) => {
  const [lunchId] = await db.queryBuilder()
    .insert({
      AppUserId: lunch.appUserId,
      Location: lunch.location,
      Cost: lunch.cost,
      Revisit: lunch.revisit,
      LunchDate: lunch.date,
    })
    .into('Lunch')
    .returning('LunchId');

  return lunchId;
};

const updateLunch = async (lunch) => {
  const [lunchId] = await db.queryBuilder()
    .into('Lunch')
    .where('LunchId', lunch.lunchId)
    .update({
      AppUserId: lunch.appUserId,
      Location: lunch.location,
      Cost: lunch.cost,
      Revisit: lunch.revisit,
      LunchDate: lunch.date,
    })
    .returning('LunchId');

  return lunchId;
};

const getLunch = async ({ appUserId, date }) => {
  const startOfDay = moment.utc(date).startOf('day').format();
  const endOfDay = moment.utc(date).endOf('day').format();

  const lunch = await db.queryBuilder()
    .from('Lunch')
    .where('AppUserId', appUserId)
    .whereBetween('LunchDate', [startOfDay, endOfDay])
    .first('LunchId');

  if (lunch) {
    return {
      lunchId: lunch.LunchId,
    };
  }

  return null;
};

module.exports = {
  createLunch,
  updateLunch,
  getLunch,
};
