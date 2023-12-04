const express = require('express');
const { signup, signin, signout } = require('../controllers/auth.controller.js');
const verifyToken = require('../utils/userVerify.js');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.get('/', verifyToken, (req, res) => {
   res.status(200).send({ success: true, user: req.user });
});

module.exports = router;
