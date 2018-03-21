const joiErrorHandler = (err, req, res, next) => {
  if (!err.isJoi) {
    return next(err);
  }

  const response = {
    errors: err.details.map(detail => ({
      field: detail.context.key,
      message: detail.message,
    })),
  };

  return res.status(400).json(response);
};

module.exports = joiErrorHandler;
