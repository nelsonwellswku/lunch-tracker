const queries = require('./queries');

const getRestaurants = async (req, res) => {
  const { restaurantName } = req.query;

  const results = await queries.getRestaurants({
    restaurantName,
    verified: true,
  });

  res.json(results);
};

module.exports = getRestaurants;
