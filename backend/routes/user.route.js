const express = require('express');
const { changeUsername, changeAvatar, deleteUser } = require('../controllers/user.controller');
const verifyToken = require('../utils/userVerify.js');

const router = express.Router();

router.patch('/:id/username', verifyToken, changeUsername);
router.patch('/:id/avatar', verifyToken, changeAvatar);
router.delete('/', verifyToken, deleteUser);

module.exports = router;