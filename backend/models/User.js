const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  accountType: {
    type: String,
    required: true,
    enum: ['Internal', 'External']
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  // Fields for internal users (optional for external)
  role: {
    type: String,
    enum: ['student', 'organization', 'faculty'],
    required: false
  },
  department: {
    type: String,
    required: false
  },
  organization: {
    type: String,
    required: false
  },
  faculty: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Add validation for internal users' email domain
userSchema.pre('save', function(next) {
  if (this.accountType === 'Internal' && !this.email.endsWith('@gbox.adnu.edu.ph')) {
    return next(new Error('Internal users must have a @gbox.adnu.edu.ph email address'));
  }
  next();
});

// Phone number validation for all users
userSchema.path('phone').validate(function(phone) {
  const phoneRegex = /^\d+$/;
  return phoneRegex.test(phone);
}, 'Phone number must contain only digits');

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);