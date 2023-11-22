const express = require('express');
const { createTask, getTasks, deleteTask } = require('../controllers/task.controller.js');
const verifyToken = require('../utils/userVerify.js');

const router = express.Router();

router.get('/', verifyToken, getTasks);
router.post('/', verifyToken, createTask);
router.delete('/:id', verifyToken, deleteTask);

module.exports = router;