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
      status: {
         type: String,
         enum: ['not-started', 'in-progress', 'completed'],
         default: 'not-started',
      },
      dueDate: {
         type: Date,
      },
      creator: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      collaborators: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
         },
      ],
   },
   { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
