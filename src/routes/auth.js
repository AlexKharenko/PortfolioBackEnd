const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DBUser = require('../db/db_user');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const db = new DBUser();
  const usersData = await db.checkIfUsersExist();
  if (!usersData.success || usersData.count > 0) {
    res
      .status(403)
      .json({ success: false, message: 'Forbiden to create account' });
    return;
  }
  const { login, password } = req.body;
  if (!(login && password)) {
    res.status(400).send('All input is required');
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

router.post('/login', async (req, res) => {
  const db = new DBUser();
  const { login, password } = req.body;
  if (!(login && password)) {
    res.status(400).send('All input is required');
    return;
  }
  const result = await db.findUser(login);
  if (result.user.length === 0) {
    res.status(404).json({ ...result, message: 'User not found!' });
    return;
  }
  try {
    if (
      result.user.length > 0 &&
      (await bcrypt.compare(password, result.user[0].password))
    ) {
      const user = result.user[0];
      const token = jwt.sign(
        { user_id: user.id, login: user.login },
        process.env.JWT_SECRET,
        {
          expiresIn: '12h',
        }
      );
      res
        .status(200)
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 12,
          sameSite: 'none',
          secure: true,
        })
        .json({
          success: true,
          message: 'You are succesfully logged in!',
        });
    }
    if (
      result.user.length > 0 &&
      !(await bcrypt.compare(password, result.user[0].password))
    ) {
      res.status(403).json({
        success: true,
        message: 'Password incorrect!',
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

router.post('/logout', async (req, res) => {
  res
    .cookie('jwt', '', { maxAge: 0 })
    .status(201)
    .json({ success: true, message: 'You are succesfully logged out!' });
});

module.exports = router;
