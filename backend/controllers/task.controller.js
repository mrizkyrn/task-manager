const errorHandler = require('../utils/errorHandler');
const Task = require('../models/task.model.js');
const User = require('../models/user.model.js');

const getTasks = async (req, res, next) => {
   try {
      const tasks = await Task.find({ users: req.user.id });
      res.status(200).send({ success: true, message: 'Tasks fetched successfully', data: tasks });
   } catch (error) {
      next(error);
   }
};

const createTask = async (req, res, next) => {
   const { title, description, notes, priority, dueDate, dueTime } = req.body;
   const { id } = req.user;
   
   try {
      const task = new Task({
         title,
         description,
         notes,
         priority,
         dueDate,
         dueTime,
         completed: false,
         users: [id],
      });

      await task.save();

      const user = await User.findById(id);
      await user.save();

      res.status(201).send({ success: true, message: 'Task created successfully', data: task });
   } catch (error) {
      next(error);
   }
}

const deleteTask = async (req, res, next) => {
   const { id } = req.params;
   
   try {
      const deletedTask = await Task.findByIdAndDelete(id);
      res.status(200).send({ success: true, message: 'Task deleted successfully', data: deletedTask });
   } catch (error) {
      next(error);
   }
}

module.exports = {
   getTasks,
   createTask,
   deleteTask,
};