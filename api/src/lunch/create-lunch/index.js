const moment = require('moment');
const queries = require('./queries');

const createLunch = async (req, res) => {
  const { appUserId } = req.user;
  const lunchId = await queries.createLunch({
    appUserId,
    location: req.body.whereDidYouEat,
    cost: req.body.howMuchDidYouPay,
    revisit: req.body.willYouGoBack,
    date: moment.utc().format(),
  });

  res.json({
    lunchId,
  });
};

module.exports = createLunch;
