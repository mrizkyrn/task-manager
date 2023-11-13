const errorHandler = require('../utils/errorHandler');
const Task = require('../models/task.model.js');
const User = require('../models/user.model.js');

const getTasks = async (req, res, next) => {
   try {
      const tasks = await Task.find({ users: req.user.id });
      res.status(200).send({ success: true, tasks });
   } catch (error) {
      next(error);
   }
};

const createTask = async (req, res, next) => {
   const { title, description, dueDate, completed, priority } = req.body;
   const { id } = req.body;

   try {
      const task = new Task({
         title,
         description,
         dueDate,
         completed,
         priority,
         users: [id],
      });

      await task.save();

      const user = await User.findById(id);
      await user.save();

      res.status(201).send({ success: true, message: 'Task created successfully', task });
   } catch (error) {
      next(error);
   }
}

module.exports = {
   getTasks,
   createTask,
};