const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true,
         minlength: 3,
      },
      password: {
         type: String,
         required: true,
         minlength: 3,
      },
      avatar: {
         type: String,
         default: 'avatar-1'
      },
   },
   { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;