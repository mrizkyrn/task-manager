const jwt = require('jsonwebtoken');
const InvariantError = require('../exceptions/InvariantError');
const AuthenticationError = require('../exceptions/AuthenticationError');

const verifyToken = (req, res, next) => {
   const token = req.cookies.access_token;
   if (!token) return next(new AuthenticationError('Access denied, please login first'));

   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(new InvariantError('Invalid token'));
      req.user = user;
      next();
   });
};

module.exports = verifyToken;
