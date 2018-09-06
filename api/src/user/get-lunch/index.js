const moment = require('moment');
const queries = require('./queries');

const getLunch = async (req, res) => {
  const { appUserId } = req.user;
  const { date } = req.query;

  const lunch = await queries.getLunch({ appUserId, date });
  const lunchesWithDates = lunch.map(x => ({ ...x, lunchDate: moment.utc(x.lunchDate).format('YYYY-MM-DD') }));
  res.json(lunchesWithDates);
};

module.exports = getLunch;
