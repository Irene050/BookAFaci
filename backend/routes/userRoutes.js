const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/userAuth');


router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;
