const errorHandler = require('../utils/errorHandler');
const Task = require('../models/task.model.js');
const User = require('../models/user.model.js');

const getTasks = async (req, res, next) => {
   try {
      const tasks = await Task.find({ users: req.user.id }).populate('creator', 'username');
      res.status(200).send({ success: true, message: 'Tasks fetched successfully', data: tasks });
   } catch (error) {
      next(error);
   }
};

const getTask = async (req, res, next) => {
   const { id } = req.params;
   const { id: userId } = req.user;

   try {
      const tasks = await Task.findById(id);
      if (!tasks) return next(errorHandler(404, 'Task not found'));

      if (tasks.users.indexOf(userId) === -1) return next(errorHandler(403, 'Access denied'));

      res.status(200).send({ success: true, message: 'Task fetched successfully', data: tasks });
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
         creator: id,
         users: [id],
      });

      await task.save();

      const user = await User.findById(id);
      await user.save();

      res.status(201).send({ success: true, message: 'Task created successfully', data: task });
   } catch (error) {
      next(error);
   }
};

const updateTask = async (req, res, next) => {
   const { id } = req.params;
   const { title, description, notes, priority, dueDate, dueTime, completed } = req.body;
   const { id: userId } = req.user;

   try {
      const task = await Task.findById(id);
      if (!task) return next(errorHandler(404, 'Task not found'));

      if (task.users.indexOf(userId) === -1) return next(errorHandler(403, 'Access denied'));

      task.title = title;
      task.description = description;
      task.notes = notes;
      task.priority = priority;
      task.dueDate = dueDate;
      task.dueTime = dueTime;
      task.completed = completed;

      await task.save();
      res.status(200).send({ success: true, message: 'Task updated successfully', data: task });
   } catch (error) {
      next(error);
   }
};

const deleteTask = async (req, res, next) => {
   const { id } = req.params;

   try {
      const deletedTask = await Task.findByIdAndDelete(id);
      res.status(200).send({ success: true, message: 'Task deleted successfully', data: deletedTask });
   } catch (error) {
      next(error);
   }
};

const updateTaskStatus = async (req, res, next) => {
   const { id } = req.params;
   const { completed } = req.body;
   const { id: userId } = req.user;

   try {
      const task = await Task.findById(id);
      if (!task) return next(errorHandler(404, 'Task not found'));

      if (task.users.indexOf(userId) === -1) return next(errorHandler(403, 'Access denied'));

      task.completed = completed;
      await task.save();
      res.status(200).send({ success: true, message: 'Task status updated successfully', data: task });
   } catch (error) {
      next(error);
   }
};

const getAllUsers = async (req, res, next)  => {
   const { id } = req.params;

   try {
      const usersId = await Task.findById(id, 'users');
      const users = await User.find({ _id: { $in: usersId.users } }, 'username');
      res.status(200).send({ success: true, message: 'Users fetched successfully', data: users });
   } catch (error) {
      next(error);
   }
}

const addUser = async (req, res, next) => {
   const { id } = req.params;
   const { userId } = req.body;

   try {
      const task = await Task.findById(id);
      if (!task) return next(errorHandler(404, 'Task not found'));

      const user = await User.findById(userId);
      if (!user) return next(errorHandler(404, 'User not found'));

      if (task.users.indexOf(userId) !== -1) return next(errorHandler(400, 'User already added'));

      task.users.push(userId);
      await task.save();

      res.status(200).send({ success: true, message: 'User added successfully', data: task });
   } catch (error) {
      next(error);
   }
}

module.exports = {
   getTasks,
   getTask,
   createTask,
   updateTask,
   deleteTask,
   updateTaskStatus,
   getAllUsers,
   addUser,
};
