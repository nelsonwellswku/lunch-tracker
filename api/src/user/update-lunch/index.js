const queries = require('./queries');
const db = require('../../infrastructure/database');

const updateLunch = async (req, res) => {
  const {
    location,
    cost,
    revisit,
    date,
  } = req.body;
  const { appUserId, lunchId } = req.params;

  const lunchToSave = {
    lunchId,
    appUserId,
    location,
    cost,
    revisit,
    date,
  };

  await db.transaction(async (trx) => {
    await queries.updateLunch(trx, lunchToSave);
  });

  res.json({
    lunchId,
  });
};

module.exports = updateLunch;
