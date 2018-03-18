const healthCheck = (req, res) => {
  res.json({
    isAlive: true,
  });
};

const error = (req, res) => {
  throw new Error('Test Error');
};

module.exports = {
  healthCheck,
  error,
};
