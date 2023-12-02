const express = require('express');
const {
   createTask,
   getTasks,
   deleteTask,
   updateTask,
   getTaskById,
   updateTaskStatus,
   getAllCollaboratorUsers,
   addUserToCollaborators,
   removeUserFromCollaborators,
} = require('../controllers/task.controller.js');
const verifyToken = require('../utils/userVerify.js');

const router = express.Router();

router.get('/', verifyToken, getTasks);
router.get('/:id', verifyToken, getTaskById);
router.post('/', verifyToken, createTask);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);
router.patch('/:id', verifyToken, updateTaskStatus);
router.get('/:id/users', verifyToken, getAllCollaboratorUsers);
router.post('/:id/users', verifyToken, addUserToCollaborators);
router.delete('/:id/users', verifyToken, removeUserFromCollaborators);

module.exports = router;
