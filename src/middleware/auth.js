const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(403).json({
      success: false,
      main_message: 'A token is required for authentication',
    });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.body.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

module.exports = verifyToken;
