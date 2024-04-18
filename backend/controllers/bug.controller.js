const BugsService = require('../services/mongodb/BugsService');
const UsersService = require('../services/mongodb/UsersService.js');

const postBug = async (req, res, next) => {
   const { id: userId } = req.user;
   const { title, detail } = req.body;

   try {
      // verify user
      await UsersService.verifyUser(userId);

      // post bug
      await BugsService.postBug({
         title,
         detail,
         from: userId,
      });

      // send success response
      res.status(201).send({ success: true, message: 'Bug reported successfully' });
   } catch (error) {
      next(error);
   }
};

module.exports = {
   postBug,
};
