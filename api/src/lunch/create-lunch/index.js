const moment = require('moment');
const queries = require('./queries');

const createLunch = async (req, res) => {
  const { appUserId } = req.user;
  const lunchId = await queries.createLunch({
    appUserId,
    location: req.body.whereDidYouEat,
    cost: req.body.howMuchDidYouPay,
    revisit: req.body.willYouGoBack,
    date: moment().format('MM-DD-YYYY'),
  });

  res.json({
    lunchId,
  });
};

module.exports = createLunch;
