const getLunch = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

const createLunch = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

module.exports = {
  getLunch,
  createLunch,
};
