const express = require('express');
const {
   createTask,
   getTasks,
   deleteTask,
   updateTask,
   getTaskById,
   updateTaskStatus,
   getAssignees,
   addAssignee,
   removeAssignee,
} = require('../controllers/task.controller.js');
const verifyToken = require('../utils/userVerify.js');

const router = express.Router();

router.post('/', verifyToken, createTask);
router.get('/', verifyToken, getTasks);
router.get('/:id', verifyToken, getTaskById);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);
router.patch('/:id', verifyToken, updateTaskStatus);
router.get('/:id/users', verifyToken, getAssignees);
router.post('/:id/users', verifyToken, addAssignee);
router.delete('/:id/users', verifyToken, removeAssignee);

module.exports = router;
