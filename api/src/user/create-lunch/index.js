const queries = require('./queries');

const createLunch = async (req, res) => {
  const {
    location,
    cost,
    revisit,
    date,
  } = req.body;
  const { appUserId } = req.params;

  const lunchToSave = {
    appUserId,
    location,
    cost,
    revisit,
    date,
  };

  const lunchId = await queries.createLunch(lunchToSave);

  res.json({
    lunchId,
  });
};

module.exports = createLunch;
