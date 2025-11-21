const mongoose = require('mongoose');

// schema medj same lang din sa facility 
const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  image: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('Resource', resourceSchema);