const db = require('../../infrastructure/database');
const { revisit } = require('../lookups');

const updateLunch = async (trx, lunch) => {
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
    .into('lunch')
    .where('lunchId', lunch.lunchId)
    .update({
      appUserId: lunch.appUserId,
      restaurantId,
      cost: lunch.cost,
      revisitId: revisit[lunch.revisit],
      lunchDate: lunch.date,
    })
    .returning('LunchId')
    .transacting(trx);

  return lunchId;
};

module.exports = {
  updateLunch,
};
