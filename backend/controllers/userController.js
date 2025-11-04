const User = require('../models/User');

const userController = {
  // REGIS FUNCTION FOR INTERNAL AND EXTERNAL USERS
  registerUser: async (req, res) => {
    try {
      const { 
        accountType, 
        name, 
        email, 
        password, 
        phone, 
        role, 
        department, 
        organization, 
        faculty 
      } = req.body;

      console.log('Received registration data:', req.body);

      // User checker
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      // User creation
      const userData = {
        accountType: accountType || 'External',
        name,
        email,
        password,
        phone
      };

      // IF ACC IS INTERNAL WILL SHOW ROLE FIELDS
      if (accountType === 'Internal') {
        userData.role = role;
        
        if (role === 'student' || role === 'faculty') {
          userData.department = department;
        }
        if (role === 'organization') {
          userData.organization = organization;
        }
        if (role === 'faculty') {
          userData.faculty = faculty;
        }
      }

      const user = new User(userData);
      await user.save();

      // Remove password from response
      const userResponse = user.toObject();
      delete userResponse.password;

      res.status(201).json({
        success: true,
        message: `${userData.accountType} user registered successfully`,
        user: userResponse
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Login endpoint
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email to validate
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Check pass
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Remove password from response
      const userResponse = user.toObject();
      delete userResponse.password;

      res.json({
        success: true,
        message: 'Login successful',
        user: userResponse
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during login'
      });
    }
  },

  // Get all users or filter by account type
  getUsers: async (req, res) => {
    try {
      const { accountType } = req.query;
      const filter = accountType ? { accountType } : {};
      
      const users = await User.find(filter).select('-password');
      res.json({
        success: true,
        users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = userController;