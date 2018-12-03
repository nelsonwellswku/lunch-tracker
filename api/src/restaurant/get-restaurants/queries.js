const db = require('../../infrastructure/database');

const getRestaurants = async ({
  restaurantName,
  verified = null,
}) => {
  const queryBuilder = db.queryBuilder
    .from('restaurant')
    .limit(50);

  if (verified !== null) {
    queryBuilder.where('verified', verified);
  }

  if (restaurantName) {
    queryBuilder.where('restaurantName', 'like', `${restaurantName}%`);
  }

  const results = await queryBuilder.select('restaurantId', 'restaurantName', 'verified');
  return results;
};

module.exports = {
  getRestaurants,
};
