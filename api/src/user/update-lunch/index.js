const queries = require('./queries');

const updateLunch = async (req, res) => {
  const {
    location,
    cost,
    revisit,
    date,
  } = req.body;
  const { appUserId } = req.params;
  const lunchId = await queries.getLunchId({
    appUserId,
    date,
  });

  const lunchToSave = {
    lunchId,
    appUserId,
    location,
    cost,
    revisit,
    date,
  };

  const returnedLunchId = await queries.updateLunch(lunchToSave);

  res.json({
    lunchId: returnedLunchId,
  });
};

module.exports = updateLunch;
