const express = require('express');
const { createTask, getTasks, deleteTask, updateTask, getTask, updateTaskStatus, getAllUsers, addUserToTask, removeUserFromTask } = require('../controllers/task.controller.js');
const verifyToken = require('../utils/userVerify.js');

const router = express.Router();

router.get('/', verifyToken, getTasks);
router.get('/:id', verifyToken, getTask);
router.post('/', verifyToken, createTask);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);
router.patch('/:id', verifyToken, updateTaskStatus);
router.get('/:id/users', verifyToken, getAllUsers)
router.post('/:id/users', verifyToken, addUserToTask)
router.delete('/:id/users', verifyToken, removeUserFromTask)

module.exports = router;