const TasksService = require('../services/mongodb/TasksService');
const UsersService = require('../services/mongodb/UsersService.js');

const createTask = async (req, res, next) => {
   const { id: userId } = req.user;
   const { title, description, notes, priority, status, dueDate } = req.body;

   try {
      // create the task
      const taskId = await TasksService.createTask({
         title,
         description,
         notes,
         priority,
         status,
         dueDate,
         creator: userId,
         assignees: [{ user: userId, role: 'admin' }],
      });

      // add task to user's tasks array
      await UsersService.addTaskToUser(userId, taskId);

      // send success response
      res.status(201).send({ success: true, message: 'Task created successfully', data: { _id: taskId } });
   } catch (error) {
      next(error);
   }
};

const getTasks = async (req, res, next) => {
   const { id: userId } = req.user;

   try {
      // get tasks
      const tasks = await TasksService.getTasks(userId);

      // send success response
      res.status(200).send({
         success: true,
         message: 'Tasks fetched successfully',
         data: {
            totalTasks: tasks.totalTasks,
            notStartedTasks: tasks.notStartedTasks,
            inProgressTasks: tasks.inProgressTasks,
            completedTasks: tasks.completedTasks,
            overdueTasks: tasks.overdueTasks,
            tasks: tasks.tasks,
         },
      });
   } catch (error) {
      next(error);
   }
};

const getTaskById = async (req, res, next) => {
   const { id } = req.params;
   const { id: userId } = req.user;

   try {
      // get task
      const tasks = await TasksService.getTaskById(id);

      // check if user is authorized
      await TasksService.verifyTaskAccess(tasks, userId);

      res.status(200).send({ success: true, message: 'Task fetched successfully', data: tasks });
   } catch (error) {
      next(error);
   }
};

const updateTask = async (req, res, next) => {
   const { id: userId } = req.user;
   const { id: taskId } = req.params;
   const { title, description, notes, priority, status, dueDate } = req.body;

   try {
      // check if user is authorized to update task
      await TasksService.verifyTaskCollaborator(taskId, userId);

      // update the task
      await TasksService.updateTask(taskId, {
         title,
         description,
         notes,
         priority,
         status,
         dueDate,
      });

      // send success response
      res.status(200).send({ success: true, message: 'Task updated successfully' });
   } catch (error) {
      next(error);
   }
};

const deleteTask = async (req, res, next) => {
   const { id: userId } = req.user;
   const { id: taskId } = req.params;

   try {
      // check if user is authorized to delete task
      await TasksService.verifyTaskAccess(taskId, userId);

      const task = await TasksService.getTaskById(taskId);

      // check if user is the only task assignee
      if (task.assignees.length === 1) {
         // delete task from database
         await TasksService.deleteTaskById(taskId);
      } else {
         // remove user from task
         await TasksService.removeAssignee(taskId, userId);
      }

      // remove task from user's tasks array
      await UsersService.removeTaskFromUser(userId, taskId);

      // send success response
      return res.status(200).send({ success: true, message: 'Task deleted successfully', data: task });
   } catch (error) {
      next(error);
   }
};

const updateTaskStatus = async (req, res, next) => {
   const { id: userId } = req.user;
   const { id: taskId } = req.params;
   const { status } = req.body;

   try {
      // check if user is authorized
      await TasksService.verifyTaskCollaborator(taskId, userId);

      // update task status
      await TasksService.updateTaskStatus(taskId, status);

      res.status(200).send({ success: true, message: 'Task status updated successfully' });
   } catch (error) {
      next(error);
   }
};

const getAssignees = async (req, res, next) => {
   const { id: taskId } = req.params;

   try {
      // get assignees for the task
      const assignees = await TasksService.getAssignees(taskId);

      // map assignees to a more concise data format
      const data = assignees.map(({ user, role }) => ({
         _id: user._id,
         username: user.username,
         avatar: user.avatar,
         role,
      }));

      // send success response
      res.status(200).send({ success: true, message: 'Assigned users fetched successfully', data });
   } catch (error) {
      next(error);
   }
};

const addAssignee = async (req, res, next) => {
   const { id: taskId } = req.params;
   const { id: userId, role } = req.body;

   try {
      // check if user exists
      await UsersService.verifyUser(userId);

      // check if user is already added
      await TasksService.verifyAddAssignee(taskId, userId);

      // add user to assignees
      await TasksService.addAssignee(taskId, userId, role);

      // add task to user's tasks array
      const user = await UsersService.addTaskToUser(userId, taskId);

      // send success response
      res.status(200).send({
         success: true,
         message: `${user.username} added to task`,
         data: { _id: user._id, username: user.username, avatar: user.avatar },
      });
   } catch (error) {
      next(error);
   }
};

const removeAssignee = async (req, res, next) => {
   const { id: userId } = req.user;
   const { id: taskId } = req.params;
   const { removedUserId } = req.body;

   try {
      // check if user exists and get username
      const user = await UsersService.getUserById(removedUserId);

      // check if user is authorized to remove user from task
      await TasksService.verifyTaskAdmin(taskId, userId);

      // Remove user from task
      await TasksService.removeAssignee(taskId, removedUserId);

      // Remove task from user's tasks array
      await UsersService.removeTaskFromUser(removedUserId, taskId);

      res.status(200).send({ success: true, message: `${user.username} removed from task` });
   } catch (error) {
      next(error);
   }
};

module.exports = {
   createTask,
   getTasks,
   getTaskById,
   updateTask,
   deleteTask,
   updateTaskStatus,
   getAssignees,
   addAssignee,
   removeAssignee,
};
