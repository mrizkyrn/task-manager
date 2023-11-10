const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const signup = async (req, res) => {
   const { username, password } = req.body;

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = bcrypt.hashSync(password, salt);

   const user = new User({
      username,
      password: hashedPassword,
   });

   try {
      await user.save();
      res.status(201).send({ message: 'User created' });
   } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
   }
};

const signin = async (req, res) => {
   res.send('Sign in');
};

module.exports = {
   signup,
   signin,
};
