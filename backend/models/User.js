const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select:false  
  },
  role: {
    type: String,
    enum: ['ppa', 'internal', 'external', 'admin'],
    default: 'internal'
  },
  subRole: {
    type: String,
    enum: [
      'student',
      'faculty',
      'organization',
      'alumni',
      
    ],
    required: function () {
      return this.role === 'internal' || this.role === 'external';
    }
  },
  department: {
    type: String
  },
  phone: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);