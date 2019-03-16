const moment = require('moment');
const queries = require('./queries');

const getLunches = async (req, res) => {
  const { appUserId } = req.user;
  const { date, startDate, endDate } = req.query;

  const lunches = await queries.getLunches({
    appUserId,
    date,
    startDate,
    endDate,
  });

  const lunchesWithDates = lunches.map(x => ({ ...x, lunchDate: moment.utc(x.lunchDate).format('YYYY-MM-DD') }));
  res.json(lunchesWithDates);
};

module.exports = getLunches;
