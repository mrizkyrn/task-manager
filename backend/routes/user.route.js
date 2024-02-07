const express = require('express');
const { changeUsername, changeAvatar, deleteUser, searchUserByUsername } = require('../controllers/user.controller');
const verifyToken = require('../utils/userVerify.js');

const router = express.Router();

router.get('/search', verifyToken, searchUserByUsername);
router.patch('/:id/username', verifyToken, changeUsername);
router.patch('/:id/avatar', verifyToken, changeAvatar);
router.delete('/', verifyToken, deleteUser);

module.exports = router;
