const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); // ✅ add this

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', bookingRoutes); // ✅ add this

// Test route
app.get('/', (req, res) => {
  res.send('BookAFaci API running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '127.0.0.1', () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
