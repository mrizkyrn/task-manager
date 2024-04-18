const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
      },
      detail: {
         type: String,
         required: true,
      },
      from: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
   },
   { timestamps: true }
);

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;
