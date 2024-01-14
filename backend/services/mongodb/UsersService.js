// const User = require('../../models/user.model');
// const errorHandler = require('../../utils/errorHandler');

// class UsersService {
//    static async changeUsername(id, username) {
//       this.checkUsername(username);

//       const result = await User.updateOne({ _id: id }, { username });
//       if (!result.nModified) throw errorHandler(400, 'Username failed to update');

//       return true;
//    }

//    static async checkUsername(username) {
//       const existingUsername = await User.findOne({ username });
//       if (existingUsername) throw errorHandler(400, 'Username already taken');

//       return true;
//    }
// }

// module.exports = UsersService;
