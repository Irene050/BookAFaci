const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/userAuth');
const User = require('../models/User'); // Add this to fetch users

router.post('/register', registerUser);
router.post('/login', loginUser);


router.get('/users', async (req, res) => {
try {
const users = await User.find().select('name email'); // Only return name & email
res.status(200).json(users);
} catch (error) {
console.error('Error fetching users:', error);
res.status(500).json({ message: 'Server error' });
}
});

module.exports = router;
