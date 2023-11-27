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
      notes: [
         {
            type: String,
            required: true,
         },
      ],
      priority: {
         type: String,
         enum: ['low', 'medium', 'high'],
         default: 'medium',
      },
      dueDate: {
         type: Date,
      },
      dueTime: {
         type: String,
      },
      completed: {
         type: Boolean,
         default: false,
      },
      creator: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
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
// "title": "example task",
// "description": "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.",
// "dueDate": "2021-09-30",
// "completed": false,
// "priority": "medium",
// "users": ["6142c5d0d4e5b2a7f5d1c9d0"]
// }

module.exports = Task;
