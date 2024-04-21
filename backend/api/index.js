require('dotenv').config({ path: '../.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ClientError = require('../exceptions/ClientError.js');

const userRoute = require('../routes/user.route.js');
const authRoute = require('../routes/auth.route.js');
const taskRoute = require('../routes/task.route.js');
const bugRoute = require('../routes/bug.route.js');

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
app.use('/api/bugs', bugRoute);

app.get('/', (req, res) => {
   res.send('Task Manager API');
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
   if (error instanceof ClientError) {
      res.status(error.statusCode).json({
         success: false,
         message: error.message,
      });
   } else {
      console.error(error);
      res.status(500).json({
         success: false,
         message: 'Internal server error',
      });
   }
});
