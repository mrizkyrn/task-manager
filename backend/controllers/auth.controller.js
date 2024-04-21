const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthenticationError = require('../exceptions/AuthenticationError');
const UsersService = require('../services/mongodb/UsersService');

const signup = async (req, res, next) => {
   try {
      const { username, password } = req.body;

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // create user
      await UsersService.addUser(username, hashedPassword);

      res.status(201).send({ success: true, message: 'User created successfully' });
   } catch (error) {
      next(error);
   }
};

const signin = async (req, res, next) => {
   try {
      const { username, password } = req.body;
      const user = await UsersService.getUserByUsername(username);

      // check if password is correct
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) return next(new AuthenticationError('Username or password is incorrect'));

      // create token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      // send user data and token
      const data = { _id: user._id, username: user.username, avatar: user.avatar };
      res.cookie('access_token', token, { httpOnly: true, sameSite: 'None', secure: true })
         .status(200)
         .send({ success: true, message: 'User signed in successfully', user: data });
   } catch (error) {
      next(error);
   }
};

const signout = async (req, res, next) => {
   try {
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
