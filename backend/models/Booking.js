const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingType: { type: String, 
    enum: ['facility','resource','facility_with_resource'], 
    required: true },
    user: { type: mongoose.Schema.Types.ObjectId,
    ref: 'User', required: true },
  facility: { 
    type: String, 
    required: function(){
       return this.bookingType === 'facility' || this.bookingType === 'facility_with_resource'; } 
  },
  resource: { 
    type: [String], 
    required: function() {
       return this.bookingType === 'resource' || this.bookingType === 'facility_with_resource'; } 
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
     type: String,
     enum: ['pending','approved','rejected','completed','cancelled'],
     default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
