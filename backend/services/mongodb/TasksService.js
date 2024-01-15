const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const Task = require('../../models/task.model');

class TasksService {
   static async createTask({ title, description, notes, priority, dueDate, creator }) {
      const task = new Task({
         title,
         description,
         notes,
         priority,
         dueDate,
         creator,
      });

      const result = await task.save();

      if (!result) throw new InvariantError('Failed to create task');
      return result._id;
   }

   static async getTasks(userId) {
      const tasks = await Task.find({
         $or: [{ creator: userId }, { collaborators: userId }],
      }).populate('creator', 'username avatar');

      const totalTasks = tasks.length;
      const completedTasks = tasks.filter((task) => task.completed).length;
      const overdueTasks = tasks.filter((task) => task.dueDate !== null && task.dueDate < Date.now()).length;

      return { totalTasks, completedTasks, overdueTasks, tasks };
   }

   static async getTaskById(id) {
      const task = await Task.findById(id);

      if (!task) throw new NotFoundError('Task not found');
      return task;
   }

   static async updateTask(id, { title, description, notes, priority, dueDate }) {
      console.log('updateTask');
      const result = await Task.updateOne({ _id: id }, { title, description, notes, priority, dueDate });

      if (!result.modifiedCount) throw new InvariantError('Failed to update task');
      return result;
   }

   static async deleteTaskById(id) {
      const result = await Task.findByIdAndDelete(id);
      if (!result) throw new InvariantError('Failed to delete task');
   }

   static async updateTaskStatus(taskId, completed) {
      const task = await Task.findById(taskId);

      if (!task) throw new NotFoundError('Task not found');
      task.completed = completed;
      await task.save();
   }

   static async getAllCollaboratorUsers(taskId) {
      const task = await Task.findById(taskId).populate('collaborators', 'username avatar');

      if (!task) throw new NotFoundError('Task not found');
      return task.collaborators;
   }

   static async addUserToCollaborators(taskId, userId) {
      const task = await Task.findById(taskId);

      if (!task) throw new NotFoundError('Task not found');
      task.collaborators.push(userId);
      await task.save();
   }

   static async removeUserFromCollaborators(taskId, userId) {
      const task = await Task.findById(taskId);

      if (!task) throw new NotFoundError('Task not found');
      task.collaborators.pull(userId);
      await task.save();
   }

   static async verifyTaskCreator(taskId, userId) {
      const task = await Task.findById(taskId);
      if (task.creator.toString() !== userId) throw new InvariantError('Only the creator can do this');
   }

   static async verifyTaskAccess(taskId, userId) {
      const task = await Task.findById(taskId);
      console.log(task);
      if (task.creator.toString() !== userId && task.collaborators.indexOf(userId) === -1) {
         throw new InvariantError('You are not authorized to do this');
      }
   }

   static async verifyAddCollaborator(taskId, userId) {
      const task = await Task.findById(taskId);

      if (!task) throw new NotFoundError('Task not found');
      if (task.collaborators.indexOf(userId) !== -1) throw new InvariantError('User is already a collaborator');
   }
}

module.exports = TasksService;
