const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1,
  handler: (req, res, next, options) => {
    res
      .status(options.statusCode)
      .json({ success: false, message: options.message });
  },
});

module.exports = limiter;
