const User = require('../../models/user.model');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class UsersService {
   static async addUser(username, password) {
      await this.verifyUsername(username);

      const user = new User({
         username,
         password,
      });

      const result = await user.save();
      if (!result) throw new InvariantError('Failed to create user');
   }

   static async searchUserByUsername(username) {
      // return username and avatar only
      const result = await User.find({ username: { $regex: username, $options: 'i' } }, 'username avatar');

      if (!result) throw new NotFoundError('User not found');
      return result;
   }

   static async getUserByUsername(username) {
      const result = await User.findOne({ username });

      if (!result) throw new NotFoundError('User not found');
      return result;
   }

   static async getUserById(id) {
      const result = await User.findById(id);

      if (!result) throw new NotFoundError('User not found');
      return result;
   }

   static async getUsers() {
      const users = await User.find();
      return users;
   }

   static async changeUsername(id, username) {
      await this.verifyUsername(username);

      const result = await User.updateOne({ _id: id }, { username });
      if (!result.modifiedCount) throw new InvariantError('Failed to update username');
   }

   static async changeAvatar(id, avatar) {
      const result = await User.updateOne({ _id: id }, { avatar });
      if (!result.modifiedCount) throw new InvariantError('Failed to update avatar');
   }

   static async editUser(id, username, avatar) {
      this.verifyUser(id);

      const user = await User.findById(id);
      if (username) user.username = username;
      if (avatar) user.avatar = avatar;
      await user.save();

      const { password, ...data } = user._doc;
      return data;
   }

   static async deleteUserById(id) {
      this.verifyUser(id);

      await User.findByIdAndDelete(id);
   }

   static async addTaskToUser(id, taskId) {
      this.verifyUser(id);

      const user = await User.findById(id);
      user.tasks.push(taskId);
      await user.save();
      return user;
   }

   static async removeTaskFromUser(id, taskId) {
      const user = await User.findById(id);
      user.tasks.pull(taskId);

      const result = await user.save();
      if (!result) throw new InvariantError('Failed to remove task from user');
   }

   static async verifyUser(id) {
      const validUser = await User.findById(id);
      if (!validUser) throw new NotFoundError('User not found');
   }

   static async verifyUsername(username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) throw new InvariantError('Username already taken');
   }
}

module.exports = UsersService;
