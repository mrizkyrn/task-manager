const errorHandler = require('./errorHandler');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
   const token = req.cookies.access_token;
   if (!token) return next(errorHandler(401, 'Access denied. No token provided'));

   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(errorHandler(400, 'Invalid token'));
      req.user = user;
      next();
   });
};

module.exports = verifyToken;
