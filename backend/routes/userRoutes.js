const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');
const User = require('../models/User');


router.post('/register', registerUser);

router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('name email role subRole department phone');
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
