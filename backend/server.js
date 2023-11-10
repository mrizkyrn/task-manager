const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');

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

app.listen(3000, () => {
   console.log('Server running on port 3000');
});

app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
