const errorHandler = require('../utils/errorHandler');
const Task = require('../models/task.model.js');
const User = require('../models/user.model.js');

const getTasks = async (req, res, next) => {
   const { id } = req.user;

   try {
      // find all tasks that have the user's id in the users array
      // populate creator field without password
      const tasks = await Task.find({ users: id }).populate('creator', '-password');

      // Check if user has any tasks
      if (tasks.length === 0) return next(errorHandler(404, 'No tasks found'));

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

      // Check if task exists
      if (!tasks) return next(errorHandler(404, 'Task not found'));

      // Check if user is authorized
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

      // Add task to user's tasks array
      const user = await User.findById(id);
      user.tasks.push(task._id);
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

      // Check if task exists
      if (!task) return next(errorHandler(404, 'Task not found'));

      // Check if user is authorized
      if (task.users.indexOf(userId) === -1) return next(errorHandler(403, 'Access denied'));

      // Update task
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

      // Check if task exists
      if (!deletedTask) return next(errorHandler(404, 'Task not found'));

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

      // Check if task exists
      if (!task) return next(errorHandler(404, 'Task not found'));

      // Check if user is authorized
      if (task.users.indexOf(userId) === -1) return next(errorHandler(403, 'Access denied'));

      // Update task status
      task.completed = completed;

      await task.save();
      res.status(200).send({ success: true, message: 'Task status updated successfully', data: task });
   } catch (error) {
      next(error);
   }
};

const getAllUsers = async (req, res, next) => {
   const { id } = req.params;

   try {
      // Find all users id that are in the users array
      const usersId = await Task.findById(id, 'users');

      // Find all users that have the id in the usersId array 
      const users = await User.find({ _id: { $in: usersId.users } });

      // Sort users by usersId array
      users.sort((a, b) => {
         return usersId.users.indexOf(a._id) - usersId.users.indexOf(b._id);
      });

      // Remove password from users
      const { password: pwd, ...data } = users;

      res.status(200).send({ success: true, message: 'Users fetched successfully', data: users });
   } catch (error) {
      next(error);
   }
};

const addUserToTask = async (req, res, next) => {
   const { id } = req.params;
   const { userId } = req.body;

   try {
      // Check if task exists
      const task = await Task.findById(id);
      if (!task) return next(errorHandler(404, 'Task not found'));

      // Check if user exists
      const user = await User.findById(userId, 'username');
      if (!user) return next(errorHandler(404, 'User not found'));

      // Check if user is already added
      if (task.users.indexOf(userId) !== -1) return next(errorHandler(400, 'User already added'));

      // Add user to task
      task.users.push(userId);
      await task.save();

      res.status(200).send({ success: true, message: 'User added successfully', data: user});
   } catch (error) {
      next(error);
   }
};

const removeUserFromTask = async (req, res, next) => {
   const { id } = req.params;
   const { userId } = req.body;

   try {
      // Check if task exists
      const task = await Task.findById(id);
      if (!task) return next(errorHandler(404, 'Task not found'));

      // Check if user exists
      const user = await User.findById(userId, 'username');
      if (!user) return next(errorHandler(404, 'User not found'));

      // Remove user from task
      task.users.pull(userId);
      await task.save();

      res.status(200).send({ success: true, message: 'User removed successfully', data: user });
   } catch (error) {
      next(error);
   }
};

module.exports = {
   getTasks,
   getTask,
   createTask,
   updateTask,
   deleteTask,
   updateTaskStatus,
   getAllUsers,
   addUserToTask,
   removeUserFromTask,
};
