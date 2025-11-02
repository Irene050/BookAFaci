const express = require('express');
const router = express.Router();
const { getBookingStatus } = require('../controllers/bookingController');

router.get('/bookings/status/:userId', getBookingStatus);

module.exports = router;
