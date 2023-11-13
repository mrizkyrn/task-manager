const express = require('express');
const { createTask, getTasks } = require('../controllers/task.controller.js');
const verifyToken = require('../utils/userVerify.js');

const router = express.Router();

router.get('/',verifyToken, getTasks);
router.post('/create', createTask);

module.exports = router;