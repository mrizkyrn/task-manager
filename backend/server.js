const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/user.route.js');
const authRoute = require('./routes/auth.route.js');
const taskRoute = require('./routes/task.route.js');

dotenv.config({ path: '../.env' });

mongoose
   .connect(process.env.MONGO_URL)
   .then(() => {
      console.log('Connected to MongoDB');
   })
   .catch((error) => {
      console.log(error);
   });

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

app.listen(3000, () => {
   console.log('Server running on port 3000');
});

// Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/tasks', taskRoute);

// Middleware
app.use((error, req, res, next) => {
   const statusCode = error.statusCode || 500;
   const message = error.message || 'Internal server error';

   res.status(statusCode).json({
      success: false,
      statusCode,
      message,
   });
});
