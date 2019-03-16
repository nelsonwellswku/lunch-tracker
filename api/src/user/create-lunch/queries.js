const db = require('../../infrastructure/database');
const sharedQueries = require('../shared-queries');
const { revisit } = require('../lookups');

const createLunch = async (trx, lunch) => {
  const restaurantId = await sharedQueries.createOrGetRestaurantId(trx, lunch);
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
