const notFoundHandler = (req, res, next) => {
  res.status(404);
  res.send('Not Found');
  next();
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  return res
    .status(500)
    .send('Internal Server Error');
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
