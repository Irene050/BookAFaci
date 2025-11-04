const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);
router.get('/users', userController.getUsers);

module.exports = router;