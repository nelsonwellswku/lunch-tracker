const db = require('../../infrastructure/database');
const sharedQueries = require('../shared-queries');
const { revisit } = require('../lookups');

const updateLunch = async (trx, lunch) => {
  const restaurantId = await sharedQueries.createOrGetRestaurantId(trx, lunch);
  const [lunchId] = await db.queryBuilder()
    .into('lunch')
    .where('lunchId', lunch.lunchId)
    .update({
      appUserId: lunch.appUserId,
      restaurantId,
      cost: lunch.cost,
      revisitId: revisit[lunch.revisit],
    })
    .returning('LunchId')
    .transacting(trx);

  return lunchId;
};

module.exports = {
  updateLunch,
};
