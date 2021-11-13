const express = require('express');
const auth = require('../middleware/auth');
const limiter = require('../middleware/limiter');
const transporter = require('../config/mailer');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const newUser = {
    login: req.body.user.login,
  };
  res.status(200).json({ success: true, user: newUser });
});
router.post('/message', limiter, async (req, res) => {
  const mailOption = {
    to: process.env.EMAIL,
    subject: req.body.subject,
    text: `${req.body.text} \nFrom: ${req.body.from}`,
  };
  try {
    await transporter.sendMail(mailOption);
    res
      .status(200)
      .json({ success: true, message: 'The mail was successfully sent!' });
  } catch (err) {
    res.status(505).json({ success: false, err: 'Server error' });
  }
});
module.exports = router;
