const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ${err.name}: ${err.message}`);

  if (err.name === 'ValidationError') {
    const msg = Object.values(err.errors).map((e) => e.message).join(', ');
    return res.status(422).json({ message: msg });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: 'Duplicate entry' });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
};

module.exports = errorHandler;
