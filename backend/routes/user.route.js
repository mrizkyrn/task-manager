const express = require('express');
const { editUser, deleteUser } = require('../controllers/user.controller');
const verifyToken = require('../utils/userVerify.js');

const router = express.Router();

router.patch('/:id', verifyToken, editUser);
router.delete('/:id', verifyToken, deleteUser);

module.exports = router;