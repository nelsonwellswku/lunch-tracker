const moment = require('moment');
const queries = require('./queries');

const saveLunch = async (req, res) => {
  const { appUserId } = req.user;
  const utcNow = moment.utc();
  const lunch = await queries.getLunch({
    appUserId,
    date: utcNow,
  });

  const save = lunch ? queries.updateLunch : queries.createLunch;
  const lunchToSave = {
    lunchId: lunch ? lunch.lunchId : null,
    appUserId,
    location: req.body.whereDidYouEat,
    cost: req.body.howMuchDidYouPay,
    revisit: req.body.willYouGoBack,
    date: utcNow.format(),
  };

  const lunchId = await save(lunchToSave);

  res.json({
    lunchId,
  });
};

module.exports = saveLunch;
