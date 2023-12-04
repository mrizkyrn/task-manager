const errorHandler = require('../utils/errorHandler');
const Task = require('../models/task.model.js');
const User = require('../models/user.model.js');

const getTasks = async (req, res, next) => {
   const { id } = req.user;

   try {
      // find all tasks that have the user's id in the collaborators array
      // populate creator field without password and tasks field
      const tasks = await Task.find({ collaborators: id }).populate('creator', '-password -tasks');

      // calculate total, completed and overdue tasks
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter((task) => task.completed).length;
      const overdueTasks = tasks.filter((task) => task.dueDate !== null && task.dueDate < Date.now()).length;

      res.status(200).send({
         success: true,
         message: 'Tasks fetched successfully',
         data: { totalTasks, completedTasks, overdueTasks, tasks },
      });
   } catch (error) {
      next(error);
   }
};

const getTaskById = async (req, res, next) => {
   const { id } = req.params;
   const { id: userId } = req.user;

   try {
      // check if task exists
      const tasks = await Task.findById(id);
      if (!tasks) return next(errorHandler(404, 'Task not found'));

      // check if user is authorized
      if (tasks.collaborators.indexOf(userId) === -1) return next(errorHandler(403, 'Access denied'));

      res.status(200).send({ success: true, message: 'Task fetched successfully', data: tasks });
   } catch (error) {
      next(error);
   }
};

const createTask = async (req, res, next) => {
   const { title, description, notes, priority, dueDate, dueTime } = req.body;
   const { id } = req.user;

   try {
      // create task
      const task = new Task({
         title,
         description,
         notes,
         priority,
         dueDate,
         dueTime,
         creator: id,
         collaborators: [id],
      });

      await task.save();

      // add task to user's tasks array
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

      // check if task exists
      if (!task) return next(errorHandler(404, 'Task not found'));

      // check if user is authorized
      if (task.collaborators.indexOf(userId) === -1) return next(errorHandler(403, 'Access denied'));

      // update task
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
   const { id: userId } = req.user;
   const { id } = req.params;

   try {
      // get task
      const task = await Task.findById(id);

      // check if task exists
      if (!task) return next(errorHandler(404, 'Task not found'));

      // check if user is authorized
      if (task.collaborators.indexOf(userId) === -1) return next(errorHandler(403, 'Access denied'));

      // if task collaborator length is 1, delete task and remove task from user's tasks array
      if (task.collaborators.length === 1) {
         await Task.findByIdAndDelete(id);
         await User.updateOne({ tasks: id }, { $pull: { tasks: id } });
      } else {
         // if task collaborator length is more than 1, remove task from user's tasks array and remove user from task collaborators array
         await User.updateOne({ tasks: id }, { $pull: { tasks: id } });
         await Task.updateOne({ collaborators: userId }, { $pull: { collaborators: userId } });
      }
      return res.status(200).send({ success: true, message: 'Task deleted successfully', data: task });
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

      // check if task exists
      if (!task) return next(errorHandler(404, 'Task not found'));

      // check if user is authorized
      if (task.collaborators.indexOf(userId) === -1) return next(errorHandler(403, 'Access denied'));

      // update task status
      task.completed = completed;

      await task.save();
      res.status(200).send({ success: true, message: 'Task status updated successfully', data: task });
   } catch (error) {
      next(error);
   }
};

const getAllCollaboratorUsers = async (req, res, next) => {
   const { id } = req.params;

   try {
      // find all users id that are in the collaborators array
      const usersId = await Task.findById(id, 'collaborators');

      // find all users that have the id in the usersId array without password and tasks field
      const users = await User.find({ _id: { $in: usersId.collaborators } }, '-password -tasks');

      // sort users by usersId array
      users.sort((a, b) => {
         return usersId.collaborators.indexOf(a._id) - usersId.collaborators.indexOf(b._id);
      });

      // remove password from all users

      res.status(200).send({ success: true, message: 'Users fetched successfully', data: users });
   } catch (error) {
      next(error);
   }
};

const addUserToCollaborators = async (req, res, next) => {
   const { id } = req.params;
   const { userId } = req.body;

   try {
      // check if task exists
      const task = await Task.findById(id);
      if (!task) return next(errorHandler(404, 'Task not found'));

      // check if user exists and get username and avatar
      const user = await User.findById(userId, 'username avatar');
      if (!user) return next(errorHandler(404, 'User not found'));

      // check if user is already added
      if (task.collaborators.indexOf(userId) !== -1) return next(errorHandler(400, 'User already added'));

      // Add user to collaborators array
      task.collaborators.push(userId);
      await task.save();

      res.status(200).send({ success: true, message: 'User added successfully', data: user });
   } catch (error) {
      next(error);
   }
};

const removeUserFromCollaborators = async (req, res, next) => {
   const { id } = req.params;
   const { userId } = req.body;

   try {
      // check if task exists
      const task = await Task.findById(id);
      if (!task) return next(errorHandler(404, 'Task not found'));

      // check if user exists
      const user = await User.findById(userId, 'username avatar');
      if (!user) return next(errorHandler(404, 'User not found'));

      // check if user is not creator of task
      if (task.creator.toString() === userId) return next(errorHandler(400, 'Creator cannot be removed'));

      // Remove user from task
      task.collaborators.pull(userId);
      await task.save();

      // Remove task from user's tasks array
      await User.updateOne({ tasks: id }, { $pull: { tasks: id } });

      res.status(200).send({ success: true, message: 'User removed successfully', data: user });
   } catch (error) {
      next(error);
   }
};

module.exports = {
   getTasks,
   getTaskById,
   createTask,
   updateTask,
   deleteTask,
   updateTaskStatus,
   getAllCollaboratorUsers,
   addUserToCollaborators,
   removeUserFromCollaborators,
};
