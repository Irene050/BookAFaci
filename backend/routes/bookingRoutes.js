const express = require('express');
const router = express.Router();
const { getBookingStatus, createBooking } = require('../controllers/bookingController');

// ✅ Fetch all bookings of a user
router.get('/bookings/status/:userId', getBookingStatus);

// ✅ Create a new booking with overlap validation
router.post('/bookings', createBooking);

module.exports = router;
