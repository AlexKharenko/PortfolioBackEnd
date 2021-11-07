const express = require('express');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const DB = require('../db/index');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const db = new DB();
  const usersData = await db.checkIfUsersExist();
  if (!usersData.success || usersData.count > 0) {
    res
      .status(403)
      .json({ success: false, main_massage: 'Forbiden to create account' });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = {
    login: req.body.login,
    password: hashedPassword,
  };
  const result = await db.createUser(newUser);
  res.status(201).json(result);
});


module.exports = router;
