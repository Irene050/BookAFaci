const express = require('express');
const router = express.Router();

const {
  getBookingStatus,
  createBooking,
  editBooking,
  cancelBooking,
  getDashboardSummary,
  getDashboardLists,
  getDashboardCalendar,
  getAllBookings,
  getNotifications
} = require('../controllers/bookingController');

router.get('/book/status/:userId', getBookingStatus);
router.get('/book', getAllBookings);

router.post('/book', createBooking);
router.put('/book/:bookingId', editBooking);
router.delete('/book/:bookingId', cancelBooking);

router.get('/dashboard/summary/:userId', getDashboardSummary);
router.get('/dashboard/lists/:userId', getDashboardLists);
router.get('/dashboard/calendar/:userId', getDashboardCalendar);
router.get('/dashboard/notifications/:userId', getNotifications);

module.exports = router;
