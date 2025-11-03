const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes'); 

dotenv.config();
connectDB();

const app = express();
app.use(express.json());


app.use('/api', userRoutes); 


app.get('/', (req, res) => {
  res.send('BookAFaci API running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '127.0.0.1', () => console.log(`Server running on port ${PORT}`));

