const express = require('express');
const { editUsername } = require('../controllers/user.controller');
const verifyToken = require('../utils/userVerify.js');

const router = express.Router();

router.patch('/:id', verifyToken, editUsername);

module.exports = router;