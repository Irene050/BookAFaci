const Booking = require('../models/Booking');
const User = require('../models/User');

const getBookingsByUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  return await Booking.find({ user: user._id })
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
};

const createBooking = async ({ userName, bookingType, facility, resource, startDate, endDate }) => {
  const foundUser = await User.findOne({ name: userName });
  if (!foundUser) throw new Error('User not found');

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) throw new Error('Invalid start or end date');
  if (start >= end) throw new Error('End date/time must be later than start date/time');

  const conflictQuery = {
    bookingType,
    startDate: { $lt: end },
    endDate: { $gt: start }
  };

  if (bookingType !== 'resource') conflictQuery.facility = facility;
  if (bookingType !== 'facility') conflictQuery.resource = resource;

  const existingBooking = await Booking.findOne(conflictQuery);
  if (existingBooking) throw new Error('A conflicting booking already exists for that time range.');

  const newBooking = new Booking({
    user: foundUser._id,
    bookingType,
    facility: facility || null,
    resource: resource || null,
    startDate: start,
    endDate: end,
    status: 'pending'
  });

  await newBooking.save();
  return await newBooking.populate('user', 'name email');
};

const editBooking = async (bookingId, updates) => {
  const booking = await Booking.findById(bookingId).populate('user', 'name email');
  if (!booking) throw new Error('Booking not found');

  if (updates.bookingType) booking.bookingType = updates.bookingType;
  if (updates.facility) booking.facility = updates.facility;
  if (updates.resource) booking.resource = updates.resource;
  if (updates.startDate) booking.startDate = new Date(updates.startDate);
  if (updates.endDate) booking.endDate = new Date(updates.endDate);

  if (booking.startDate >= booking.endDate) throw new Error('End date must be after start date');

  await booking.save();
  return booking;
};

const cancelBooking = async (bookingId) => {
  const booking = await Booking.findById(bookingId).populate('user', 'name email');
  if (!booking) throw new Error('Booking not found');

  booking.status = 'cancelled';
  await booking.save();

  return booking;
};

// For DASHBOARDS
const getBookingSummary = async (userId) => {
  const now = new Date();
  const totalBookings = await Booking.countDocuments({ user: userId });
  const upcoming = await Booking.countDocuments({ user: userId, startDate: { $gte: now } });
  const cancelled = await Booking.countDocuments({ user: userId, status: 'cancelled' });

  return { totalBookings, upcoming, cancelled };
};

const getDashboardLists = async (userId) => {
  return await Booking.find({ user: userId })
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .limit(5);
};

const getCalendarBookings = async (userId) => {
  const bookings = await Booking.find({ user: userId });

  return bookings.map((b) => {
    let title = "";
    if (b.bookingType === "facility") {
      title = b.facility;
    } else if (b.bookingType === "resource") {
      title = b.resource;
    } else {
      title = [b.facility, b.resource].filter(Boolean).join(" + ");
    }

    return {
      title,
      start: b.startDate,
      end: b.endDate,
      status: b.status,
      bookingType: b.bookingType,
    };
  });
};


const getNotifications = async (userId) => {
  const now = new Date();
  const twoDaysLater = new Date();
  twoDaysLater.setDate(now.getDate() + 2);

  const upcomingBookings = await Booking.find({
    user: userId,
    startDate: { $gte: now, $lte: twoDaysLater },
    status: { $ne: 'cancelled' },
  }).populate('user', 'name email facility resource startDate endDate');

  const recentCancellations = await Booking.find({
    user: userId,
    status: 'cancelled',
    updatedAt: { $gte: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000) },
  }).populate('user', 'name email facility resource startDate endDate');

  return { upcomingBookings, recentCancellations };
};

module.exports = {
  getBookingsByUser,
  createBooking,
  editBooking,
  cancelBooking,
  getBookingSummary,
  getDashboardLists,
  getCalendarBookings,
  getNotifications
};