const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const errorHandler = require('../utils/errorHandler.js');

const signup = async (req, res, next) => {
   const { username, password } = req.body;

   try {
      // check if username already exists (case insensitive)
      const existingUser = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
      if (existingUser) return next(errorHandler(400, 'Username already exists'));

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // create user
      const user = new User({
         username,
         password: hashedPassword,
      });

      await user.save();
      res.status(201).send({ success: true, message: 'User created successfully' });
   } catch (error) {
      next(error);
   }
};

const signin = async (req, res, next) => {
   const { username, password } = req.body;

   try {
      // check if username exists (case insensitive)
      const validUser = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
      if (!validUser) return next(errorHandler(401, 'Username or password is incorrect'));

      // check if password is correct
      const validPassword = bcrypt.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Username or password is incorrect'));

      // create token
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

      // send user data and token
      const user = { _id: validUser._id, username: validUser.username, avatar: validUser.avatar };
      res.cookie('access_token', token, { httpOnly: true })
         .status(200)
         .send({ success: true, message: 'User signed in successfully', user });
   } catch (error) {
      next(error);
   }
};

const signout = async (req, res, next) => {
   try {
      // clear cookie
      res.clearCookie('access_token', { httpOnly: true, secure: true })
         .status(200)
         .send({ success: true, message: 'User signed out successfully' });
   } catch (error) {
      next(error);
   }
};

module.exports = {
   signup,
   signin,
   signout,
};
