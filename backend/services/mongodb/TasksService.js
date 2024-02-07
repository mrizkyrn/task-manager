/* eslint-disable no-param-reassign */
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const Task = require('../../models/task.model');

class TasksService {
   static async _findTaskById(taskId) {
      const task = await Task.findById(taskId);
      if (!task) throw new NotFoundError('Task not found');

      return task;
   }

   static async _getUserRole(taskId, userId) {
      const task = await this._findTaskById(taskId);

      const assignedUser = task.assignees.find((assignee) => assignee.user.toString() === userId.toString());
      if (!assignedUser) throw new NotFoundError('You are not assigned to this task');

      return assignedUser.role;
   }

   static async createTask({ title, description, notes, priority, status, dueDate, creator, assignees }) {
      const task = new Task({
         title,
         description,
         notes,
         priority,
         status,
         dueDate,
         creator,
         assignees,
      });

      const result = await task.save();
      if (!result) throw new InvariantError('Failed to create task');

      return result._id;
   }

   static async getTasks(userId) {
      const tasks = await Task.find({
         $or: [{ creator: userId }, { 'assignees.user': userId }],
      }).populate('creator', 'username avatar');

      const totalTasks = tasks.length;
      const notStartedTasks = tasks.filter((task) => task.status === 'not-started').length;
      const inProgressTasks = tasks.filter((task) => task.status === 'in-progress').length;
      const completedTasks = tasks.filter((task) => task.status === 'completed').length;
      const overdueTasks = tasks.filter((task) => task.dueDate !== null && task.dueDate < Date.now()).length;

      return { totalTasks, notStartedTasks, inProgressTasks, completedTasks, overdueTasks, tasks };
   }

   static async getTaskById(id) {
      const task = this._findTaskById(id);

      return task;
   }

   static async updateTask(id, { title, description, notes, priority, status, dueDate }) {
      const result = await Task.updateOne({ _id: id }, { title, description, notes, priority, status, dueDate });
      if (!result.modifiedCount) throw new InvariantError('Failed to update task');
   }

   static async deleteTaskById(id) {
      const result = await Task.findByIdAndDelete(id);
      if (!result) throw new InvariantError('Failed to delete task');
   }

   static async updateTaskStatus(taskId, status) {
      const task = await this._findTaskById(taskId);

      task.status = status;
      await task.save();
   }

   static async getAssignees(taskId) {
      const task = await Task.findById(taskId).populate('assignees.user', 'username avatar');

      if (!task) throw new NotFoundError('Task not found');
      return task.assignees;
   }

   static async addAssignee(taskId, userId, role) {
      const task = await this._findTaskById(taskId);

      task.assignees = [...task.assignees, { user: userId, role }];
      await task.save();
   }

   static async removeAssignee(taskId, userId) {
      const task = await this._findTaskById(taskId);

      task.assignees = task.assignees.filter((assignee) => assignee.user.toString() !== userId.toString());
      await task.save();
   }

   static async verifyTaskAdmin(taskId, userId) {
      const role = await this._getUserRole(taskId, userId);
      if (role !== 'admin') throw new AuthorizationError('User not authorized');
   }

   static async verifyTaskCollaborator(taskId, userId) {
      const role = await this._getUserRole(taskId, userId);
      if (role !== 'admin' && role !== 'collaborator') throw new AuthorizationError('User not authorized');
   }

   static async verifyTaskAccess(taskId, userId) {
      const role = await this._getUserRole(taskId, userId);
      if (!role) throw new AuthorizationError('User not authorized');
   }

   static async verifyAddAssignee(taskId, userId) {
      const task = await this._findTaskById(taskId);

      if (task.assignees.find((assignee) => assignee.user.toString() === userId.toString())) {
         throw new InvariantError('User is already assigned to this task');
      }
   }
}

module.exports = TasksService;
