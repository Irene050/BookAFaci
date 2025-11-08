const bookingService = require('../services/bookingService');

const getBookingStatus = async (req, res) => {
  try {
    const { userName } = req.params;
    const bookings = await bookingService.getBookingsByUser(userId);

    if (!bookings.length)
      return res.status(404).json({ message: 'No bookings found for this user' });

    res.status(200).json({ message: 'Bookings fetched successfully', bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const { user, facility, date } = req.body; // 'user' here is the name
    const booking = await bookingService.createBooking(user, facility, date);
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { user, facility, date } = req.body;

    const booking = await bookingService.editBooking(bookingId, user, facility, date);
    res.status(200).json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await bookingService.cancelBooking(bookingId);
    res.status(200).json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getBookingStatus,
  createBooking,
  editBooking,
  cancelBooking,
};
