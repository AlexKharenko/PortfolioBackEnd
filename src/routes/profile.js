const express = require('express');
const auth = require('../middleware/auth');
// const DB = require('../db/index');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const newUser = {
    login: req.body.login,
  };
  res.status(200).json({ success: true, user: newUser });
});

module.exports = router;
