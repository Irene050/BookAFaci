const User = require('../models/User');
const bcrypt = require('bcryptjs');


const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, subRole, department, phone } = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

   
    if ((role === 'internal' || role === 'external') && !subRole) {
      return res.status(400).json({
        message: `subRole is required for role "${role}".`
      });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      subRole,
      department,
      phone
    });

    await user.save();

    res.status(201).json({
      message: '✅ User registered successfully',
      user
    });
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: '❌ Server error' });
  }
};

module.exports = { registerUser };