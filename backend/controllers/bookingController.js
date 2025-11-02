const Booking = require('../models/Booking');

// GET /api/bookings/status/:userId
const getBookingStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ user: userId })
      .populate('user', 'name email') 
      .sort({ createdAt: -1 });

    if (!bookings.length) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    res.status(200).json({ message: 'Bookings fetched successfully', bookings });
  } catch (error) {
    console.error('Error fetching booking status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getBookingStatus };
