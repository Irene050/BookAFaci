const express = require('express');
const router = express.Router();
const {
  getBookingStatus,
  createBooking,
  editBooking,
  cancelBooking
} = require('../controllers/bookingController');

router.get('/bookings/status/:userId', getBookingStatus);
router.post('/', createBooking);
router.put('/:bookingId', editBooking);
router.delete('/:bookingId', cancelBooking);

module.exports = router;
