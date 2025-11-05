const Booking = require('../models/Booking');

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

const createBooking = async (req, res) => {
try {
const { user, facility, date } = req.body;

// Convert date string to Date object (accepts "YYYY-MM-DD" or "MM/DD/YYYY")
const bookingDate = new Date(date);
if (isNaN(bookingDate.getTime())) {
  return res.status(400).json({ message: 'Invalid date format' });
}

// Check for overlapping booking
const existingBooking = await Booking.findOne({
  facility,
  date: bookingDate,
});

if (existingBooking) {
  return res.status(400).json({
    message: 'This facility is already booked on the selected date.',
  });
}

const newBooking = new Booking({
  user,
  facility,
  date: bookingDate,
  status: 'pending',
});

await newBooking.save();

res.status(201).json({
  message: 'Booking created successfully',
  booking: newBooking,
});

} catch (error) {
console.error('Error creating booking:', error);
res.status(500).json({ message: 'Server error' });
}
};

module.exports = { getBookingStatus, createBooking };