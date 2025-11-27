const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingType: {
    type: String,
    enum: ['facility', 'equipment', 'facility_with_equipment'],
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  facility: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Facility',
    required: function () {
      return this.bookingType === 'facility' || this.bookingType === 'facility_with_equipment';
    }
  },
  equipment: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'equipment',
    required: function () {
      return this.bookingType === 'equipment' || this.bookingType === 'facility_with_equipment';
    }
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
}, { timestamps: true });


module.exports = mongoose.model('Booking', bookingSchema);
