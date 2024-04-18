const express = require('express');
const { postBug } = require('../controllers/bug.controller.js');
const verifyToken = require('../utils/userVerify.js');

const router = express.Router();

router.post('/', verifyToken, postBug);

module.exports = router;
