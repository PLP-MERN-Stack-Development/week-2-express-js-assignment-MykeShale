class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      error: err.message
    });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: err.message
    });
  }

  // Default error
  res.status(500).json({
    error: 'Internal Server Error'
  });
};

module.exports = {
  errorHandler,
  NotFoundError,
  ValidationError
}; 