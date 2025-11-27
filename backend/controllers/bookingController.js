const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const User = require("../models/User");

const getBookingStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const bookings = await Booking.find({ user: userObjectId })
      .populate("user", "name email")
      .populate("facility")   // populate facility details
      .populate("equipment")   // populate equipment details
      .sort({ startDate: 1 });

    if (!bookings.length)
      return res.status(404).json({ message: "No bookings found for this user" });

    res.status(200).json({ message: "Bookings fetched successfully", bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("facility")
      .populate("equipment")
      .sort({ createdAt: -1 });
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const { user, bookingType, facility, equipment, startDate, endDate } = req.body;

    const booking = await Booking.create({
      user,
      bookingType,
      facility,
      equipment,
      startDate,
      endDate,
      status: "pending",
    });

    const populated = await booking.populate("user", "name email");
    res.status(201).json({ message: "Booking created successfully", booking: populated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { user, bookingType, facility, equipment, startDate, endDate, status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { user, bookingType, facility, equipment, startDate, endDate, status },
      { new: true }
    ).populate("user", "name email")
     .populate("facility")
     .populate("equipment");

    res.status(200).json({ message: "Booking updated successfully", booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "cancelled" },
      { new: true }
    ).populate("user", "name email")
     .populate("facility")
     .populate("equipment");

    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getDashboardSummary = async (req, res) => {
  try {
    const { userId } = req.params;
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const now = new Date();

    const total = await Booking.countDocuments({ user: userObjectId });
    const upcoming = await Booking.countDocuments({ user: userObjectId, startDate: { $gte: now } });
    const cancelled = await Booking.countDocuments({ user: userObjectId, status: "cancelled" });

    res.status(200).json({ totalBookings: total, upcoming, cancelled });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard summary", error: error.message });
  }
};

const getDashboardLists = async (req, res) => {
  try {
    const { userId } = req.params;
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const lists = await Booking.find({ user: userObjectId })
      .populate("user", "name email")
      .populate("facility")
      .populate("equipment")
      .sort({ createdAt: -1 });

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard list", error: error.message });
  }
};

const getDashboardCalendar = async (req, res) => {
  try {
    const { userId } = req.params;
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const bookings = await Booking.find({ user: userObjectId });

    const calendar = bookings.map((b) => {
      let title = "";
      if (b.bookingType === "facility") {
        title = b.facility ? b.facility.name : ""; // assuming facility has a 'name' field
      } else if (b.bookingType === "equipment") {
        title = b.equipment ? b.equipment.name : ""; // assuming equipment has a 'name' field
      } else {
        title = [b.facility?.name, b.equipment?.name].filter(Boolean).join(" + ");
      }

      return {
        title,
        start: b.startDate,
        end: b.endDate,
        status: b.status,
      };
    });

    res.status(200).json(calendar);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching dashboard calendar",
      error: error.message,
    });
  }
};

const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const now = new Date();
    const twoDaysLater = new Date();
    twoDaysLater.setDate(now.getDate() + 2);

    const upcomingBookings = await Booking.find({
      user: userObjectId,
      startDate: { $gte: now, $lte: twoDaysLater },
      status: { $ne: "cancelled" },
    }).populate("user", "name email facility equipment startDate endDate");

    const recentCancellations = await Booking.find({
      user: userObjectId,
      status: "cancelled",
      updatedAt: { $gte: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000) },
    }).populate("user", "name email facility equipment startDate endDate");

    res.status(200).json({ upcomingBookings, recentCancellations });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error: error.message });
  }
};

module.exports = {
  getBookingStatus,
  createBooking,
  editBooking,
  cancelBooking,
  getDashboardSummary,
  getDashboardLists,
  getDashboardCalendar,
  getAllBookings,
  getNotifications
};
