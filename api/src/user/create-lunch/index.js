const queries = require('./queries');
const db = require('../../infrastructure/database');

const createLunch = async (req, res) => {
  const {
    location,
    cost,
    revisit,
    lunchDate,
  } = req.body;
  const { appUserId } = req.params;

  const lunchToSave = {
    appUserId,
    location,
    cost,
    revisit,
    lunchDate,
  };

  let lunchId;
  await db.transaction(async (trx) => {
    lunchId = await queries.createLunch(trx, lunchToSave);
  });

  res.json({
    lunchId,
    location,
    revisit,
    lunchDate,
    cost,
  });
};

module.exports = createLunch;
