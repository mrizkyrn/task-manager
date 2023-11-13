const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
      },
      description: {
         type: String,
      },
      dueDate: {
         type: Date,
      },
      completed: {
         type: Boolean,
         default: false,
      },
      priority: {
         type: String,
         enum: ['low', 'medium', 'high'],
         default: 'medium',
      },
      users: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
         },
      ],
   },
   { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

// const ex = {
//    "title": "Task 1",
//    "description": "Description 1",
//    "dueDate": "2021-08-01",
//    "completed": false,
//    "priority": "low",
//    "user": "60f7b9b0d4a7f4c9c0f9f2b5"
// }

module.exports = Task;