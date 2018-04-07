const createLunch = require('./create-lunch');

const getLunch = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

module.exports = {
  getLunch,
  createLunch,
};
