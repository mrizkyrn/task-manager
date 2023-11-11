const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const errorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
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
      next(error);
   }
};

const signin = async (req, res, next) => {
   const { username, password } = req.body;

   try {
      const validUser = await User.findOne({ username });
      if (!validUser) return next(errorHandler(401, 'User not found'));

      const validPassword = bcrypt.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Username or password is incorrect'));

      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pwd, ...user } = validUser._doc;
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(user);
   } catch (error) {
      next(error);
   }
};

module.exports = {
   signup,
   signin,
};
