const TasksService = require('../services/mongodb/TasksService');
const UsersService = require('../services/mongodb/UsersService.js');

const createTask = async (req, res, next) => {
   const { title, description, notes, priority, status, dueDate } = req.body;
   const { id } = req.user;

   try {
      // create task
      const taskId = await TasksService.createTask({
         title,
         description,
         notes,
         priority,
         status,
         dueDate,
         creator: id,
      });

      // add task to user's tasks array
      await UsersService.addTaskToUser(id, taskId);

      res.status(201).send({ success: true, message: 'Task created successfully', data: { _id: taskId } });
   } catch (error) {
      next(error);
   }
};

const getTasks = async (req, res, next) => {
   const userId = req.user.id;

   try {
      // get total tasks, completed tasks, overdue tasks, and tasks
      const tasks = await TasksService.getTasks(userId);

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
   const { id: taskId } = req.params;
   const { title, description, notes, priority, status, dueDate } = req.body;
   const { id: userId } = req.user;

   try {
      // check if user is authorized
      await TasksService.verifyTaskAccess(taskId, userId);

      // update task
      await TasksService.updateTask(taskId, {
         title,
         description,
         notes,
         priority,
         status,
         dueDate,
      });
      res.status(200).send({ success: true, message: 'Task updated successfully' });
   } catch (error) {
      next(error);
   }
};

const deleteTask = async (req, res, next) => {
   const { id } = req.params;
   const { id: userId } = req.user;

   try {
      // check if user is authorized
      await TasksService.verifyTaskAccess(id, userId);

      const task = await TasksService.getTaskById(id);

      // if user is creator
      if (task.creator.toString() === userId) {
         // delete task if no collaborators
         if (task.collaborators.length === 0) await TasksService.deleteTaskById(id);
      } else {
         // if user is collaborator
         // delete task if creator already left
         if (task.collaborators.length === 1) await TasksService.deleteTaskById(id);

         // remove user from collaborators array
         task.collaborators.pull(userId);
         await task.save();
      }

      // remove task from user's tasks array
      await UsersService.removeTaskFromUser(userId, id);

      return res.status(200).send({ success: true, message: 'Task deleted successfully', data: task });
   } catch (error) {
      next(error);
   }
};

const updateTaskStatus = async (req, res, next) => {
   const { id } = req.params;
   const { status } = req.body;
   const { id: userId } = req.user;

   try {
      // check if user is authorized
      await TasksService.verifyTaskAccess(id, userId);

      // update task status
      await TasksService.updateTaskStatus(id, status);

      res.status(200).send({ success: true, message: 'Task status updated successfully' });
   } catch (error) {
      console.log(error);
      next(error);
   }
};

const getAllCollaboratorUsers = async (req, res, next) => {
   const { id } = req.params;

   try {
      // get all collaborator users
      const users = await TasksService.getAllCollaboratorUsers(id);

      res.status(200).send({ success: true, message: 'Collaborators fetched successfully', data: users });
   } catch (error) {
      next(error);
   }
};

const addUserToCollaborators = async (req, res, next) => {
   const { id } = req.params;
   const { userId } = req.body;

   try {
      // check if user exists and get username and avatar
      await UsersService.verifyUser(userId);

      // check if user is already added
      await TasksService.verifyAddCollaborator(id, userId);

      // Add user to collaborators array
      await TasksService.addUserToCollaborators(id, userId);

      // Add task to user's tasks array
      const user = await UsersService.addTaskToUser(userId, id);

      res.status(200).send({
         success: true,
         message: `${user.username} added to task`,
         data: { _id: user._id, username: user.username, avatar: user.avatar },
      });
   } catch (error) {
      next(error);
   }
};

const removeUserFromCollaborators = async (req, res, next) => {
   const { id } = req.params;
   const { removedUserId } = req.body;
   const { id: userId } = req.user;

   try {
      // check if user exists and get username
      const user = await UsersService.getUserById(removedUserId);

      // check if user is authorized
      await TasksService.verifyTaskCreator(id, userId);

      // Remove user from task
      await TasksService.removeUserFromCollaborators(id, removedUserId);

      // Remove task from user's tasks array
      await UsersService.removeTaskFromUser(removedUserId, id);

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
   getAllCollaboratorUsers,
   addUserToCollaborators,
   removeUserFromCollaborators,
};
