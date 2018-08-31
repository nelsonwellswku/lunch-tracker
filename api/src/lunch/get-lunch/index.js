const queries = require('./queries');

const getLunch = async (req, res) => {
  const { appUserId } = req.user;
  const { date } = req.query;

  const lunch = await queries.getLunch({ appUserId, date });
  res.json(lunch);
};

module.exports = getLunch;
