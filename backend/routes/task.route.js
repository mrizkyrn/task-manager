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
   getUserTaskRole,
   changeAssigneeRole,
   changeTaskImportance,
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
router.get('/:id/users/role', verifyToken, getUserTaskRole);
router.patch('/:id/users/role', verifyToken, changeAssigneeRole);
router.patch('/:id/importance', verifyToken, changeTaskImportance);

module.exports = router;
