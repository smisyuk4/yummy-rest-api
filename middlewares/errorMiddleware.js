const { HttpError } = require('../helpers/HttpError');

const errorMiddleware = (error, req, res, next) => {
  if (!error.message) {
    error = HttpError(error.status);
  }
  res.status(500).json({ message: error.message });
};

module.exports = {
  errorMiddleware,
};
