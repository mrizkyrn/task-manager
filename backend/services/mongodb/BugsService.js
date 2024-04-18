const InvariantError = require('../../exceptions/InvariantError');
const Bug = require('../../models/bug.model');

class BugsService {
   static async postBug({ title, detail, from }) {
      const bug = new Bug({
         title,
         detail,
         from,
      });

      const result = await bug.save();
      if (!result) throw new InvariantError('Failed to post bug');

      return result._id;
   }
}

module.exports = BugsService;
