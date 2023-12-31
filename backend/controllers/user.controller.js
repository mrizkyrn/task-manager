const User = require('../models/user.model.js');
const Task = require('../models/task.model.js');
const errorHandler = require('../utils/errorHandler');

const changeUsername = async (req, res, next) => {
   const { id } = req.params;
   const { username } = req.body;

   try {
      // Check if user is authorized
      if (id !== req.user.id) return next(errorHandler(403, 'Access denied'));

      // Check if username is already taken
      if (username) {
         const existingUser = await User.findOne({ username });
         if (existingUser) return next(errorHandler(400, 'Username already taken'));
      }

      // update username
      await User.updateOne({ _id: id }, { username });

      res.status(200).send({ success: true, message: 'Username updated successfully', data: { username } });
   } catch (error) {
      next(error);
   }
};

const changeAvatar = async (req, res, next) => {
   const { id } = req.params;
   const { avatar } = req.body;

   try {
      // Check if user is authorized
      if (id !== req.user.id) return next(errorHandler(403, 'Access denied'));

      // update avatar
      await User.updateOne({ _id: id }, { avatar });

      res.status(200).send({ success: true, message: 'Avatar updated successfully', data: { avatar } });
   } catch (error) {
      next(error);
   }
};

const editUser = async (req, res, next) => {
   const { id } = req.params;
   const { username, avatar } = req.body;

   try {
      // Check if user is authorized
      if (id !== req.user.id) return next(errorHandler(403, 'Access denied'));

      // Check if username is already taken
      if (username) {
         const existingUser = await User.findOne({ username });
         if (existingUser) return next(errorHandler(400, 'Username already taken'));
      }

      // Check if user exists
      const user = await User.findById(id);
      if (!user) return next(errorHandler(404, 'User not found'));

      // Update username
      if (username) user.username = username;
      if (avatar) user.avatar = avatar;
      await user.save();

      const { password: pwd, ...data } = user._doc;
      res.status(200).send({ success: true, message: 'User updated successfully', user: data });
   } catch (error) {
      next(error);
   }
};

const deleteUser = async (req, res, next) => {
   const { id } = req.user;
   try {
      // Delete user
      await User.findByIdAndDelete(id);

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
