const db = require('../../infrastructure/database');
const { revisit } = require('../lookups');

const createLunch = async (trx, lunch) => {
  let restaurantId = await db.queryBuilder()
    .from('restaurant')
    .where('restaurantName', lunch.location)
    .select('restaurantId')
    .first()
    .transacting(trx);

  if (!restaurantId) {
    [restaurantId] = await db.queryBuilder()
      .insert({
        restaurantName: lunch.location,
        verified: false,
      })
      .into('restaurant')
      .returning('restaurantId')
      .transacting(trx);
  }

  const [lunchId] = await db.queryBuilder()
    .insert({
      AppUserId: lunch.appUserId,
      restaurantId,
      Cost: lunch.cost,
      RevisitId: revisit[lunch.revisit],
      LunchDate: lunch.lunchDate,
    })
    .into('lunch')
    .returning('lunchId')
    .transacting(trx);

  return lunchId;
};

module.exports = {
  createLunch,
};
