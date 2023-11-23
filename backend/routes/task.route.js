const express = require('express');
const { createTask, getTasks, deleteTask, updateTask, getTask } = require('../controllers/task.controller.js');
const verifyToken = require('../utils/userVerify.js');

const router = express.Router();

router.get('/', verifyToken, getTasks);
router.get('/:id', verifyToken, getTask);
router.post('/', verifyToken, createTask);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);

module.exports = router;