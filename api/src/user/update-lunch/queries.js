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

module.exports = {
  createLunch,
  updateLunch,
};
