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

router.get('/bookafaci/status/:userId', getBookingStatus);
router.get('/bookafaci/all', getAllBookings);

router.get('/status/:userId', getBookingStatus);
router.get('/all', getAllBookings);

router.post('/', createBooking);
router.put('/update/:bookingId', editBooking);
router.delete('/cancel/:bookingId', cancelBooking);

router.get('/dashboard/summary/:userId', getDashboardSummary);
router.get('/dashboard/lists/:userId', getDashboardLists);
router.get('/dashboard/calendar/:userId', getDashboardCalendar);
router.get('/dashboard/notifications/:userId', getNotifications);

module.exports = router;
