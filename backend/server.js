const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes'); 
const facilityRoutes = require('./routes/facilityRoutes')

dotenv.config();
connectDB();

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/bookafaci', userRoutes); 
app.use('/bookafaci', facilityRoutes)

app.get('/', (req, res) => {
  res.send('BookAFaci API running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '127.0.0.1', () => console.log(`Server running on port ${PORT}`));