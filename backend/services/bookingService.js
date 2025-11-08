const Booking = require('../models/Booking');
const User = require('../models/User');

const getBookingsByUser = async (userName) => {
  const user = await User.findOne({ name: userName });
  if (!user) throw new Error('User not found');

  return await Booking.find({ user: user._id })
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
};

const createBooking = async (userName, facility, date) => {
  const foundUser = await User.findOne({ name: userName });
  if (!foundUser) throw new Error('User not found');

  const bookingDate = new Date(date);
  if (isNaN(bookingDate.getTime())) throw new Error('Invalid date format');

  const existingBooking = await Booking.findOne({ facility, date: bookingDate });
  if (existingBooking) throw new Error('This facility is already booked on the selected date.');

  const newBooking = new Booking({
    user: foundUser._id,
    facility,
    date: bookingDate,
    status: 'pending',
  });

  await newBooking.save();
  return await newBooking.populate('user', 'name email');
};

const editBooking = async (bookingId, userName, facility, date) => {
  const booking = await Booking.findById(bookingId).populate('user', 'name email');
  if (!booking) throw new Error('Booking not found');

  if (booking.user.name !== userName) throw new Error('Permission denied');

  if (facility) booking.facility = facility;
  if (date) {
    const newDate = new Date(date);
    if (isNaN(newDate.getTime())) throw new Error('Invalid date format');
    booking.date = newDate;
  }

  await booking.save();
  return await booking.populate('user', 'name email');
};

const cancelBooking = async (bookingId) => {
  const booking = await Booking.findById(bookingId).populate('user', 'name email');
  if (!booking) throw new Error('Booking not found');

  await booking.deleteOne();
  return booking;
};

module.exports = {
  getBookingsByUser,
  createBooking,
  editBooking,
  cancelBooking,
};
