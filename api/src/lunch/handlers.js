const saveLunch = require('./save-lunch');

const getLunch = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

module.exports = {
  getLunch,
  saveLunch,
};
