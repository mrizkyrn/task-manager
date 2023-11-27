const express = require('express');
const { editUsername, deleteUser } = require('../controllers/user.controller');
const verifyToken = require('../utils/userVerify.js');

const router = express.Router();

router.patch('/:id', verifyToken, editUsername);
router.delete('/:id', verifyToken, deleteUser);

module.exports = router;