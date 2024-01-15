const Task = require('../models/task.model.js');
const AuthorizationError = require('../exceptions/AuthorizationError');
const UsersService = require('../services/mongodb/UsersService');

const changeUsername = async (req, res, next) => {
   try {
      const { id } = req.params;
      const { username } = req.body;

      // Check if user is authorized
      if (id !== req.user.id) return next(new AuthorizationError('Access denied'));

      // Check if username is already taken
      await UsersService.verifyUsername(username);

      // update username
      await UsersService.changeUsername(id, username);

      res.status(200).send({ success: true, message: 'Username updated successfully', data: { username } });
   } catch (error) {
      next(error);
   }
};

const changeAvatar = async (req, res, next) => {
   try {
      const { id } = req.params;
      const { avatar } = req.body;

      // Check if user is authorized
      if (id !== req.user.id) return next(new AuthorizationError('Access denied'));

      // update avatar
      await UsersService.changeAvatar(id, avatar);

      res.status(200).send({ success: true, message: 'Avatar updated successfully', data: { avatar } });
   } catch (error) {
      next(error);
   }
};

const editUser = async (req, res, next) => {
   try {
      const { id } = req.params;
      const { username, avatar } = req.body;

      // Check if user is authorized
      if (id !== req.user.id) return next(new AuthorizationError('Access denied'));

      // Check if username is already taken
      await UsersService.verifyUsername(username);

      // Update user
      const data = await UsersService.editUser(id, username, avatar);

      res.status(200).send({ success: true, message: 'User updated successfully', data });
   } catch (error) {
      next(error);
   }
};

const deleteUser = async (req, res, next) => {
   try {
      const { id } = req.user;

      // Delete user
      await UsersService.deleteUserById(id);

      // Delete all tasks created by user
      await Task.deleteMany({ creator: id });

      // Remove user from all tasks assigned to user
      await Task.updateMany({ users: id }, { $pull: { users: id } });

      res.status(200).send({ success: true, message: 'User deleted successfully' });
   } catch (error) {
      next(error);
   }
};

module.exports = {
   changeUsername,
   changeAvatar,
   editUser,
   deleteUser,
};
