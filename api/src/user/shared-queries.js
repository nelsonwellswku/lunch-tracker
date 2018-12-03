const db = require('../infrastructure/database');

const createOrGetRestaurantId = async (trx, { location }) => {
  const restaurantResults = await db.queryBuilder()
    .from('restaurant')
    .where('restaurantName', location)
    .select('restaurantId')
    .first()
    .transacting(trx);

  if (restaurantResults) {
    return restaurantResults.restaurantId;
  }

  const [restaurantId] = await db.queryBuilder()
    .insert({
      restaurantName: location,
      verified: false,
    })
    .into('restaurant')
    .returning('restaurantId')
    .transacting(trx);

  return restaurantId;
};

module.exports = {
  createOrGetRestaurantId,
};
