const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.post('/users/', userController.createUser);

router.get('/users/all', userController.getAllUsers);

router.get('/users/:id', userController.getUserById);

router.put('/users/:id', userController.updateUserById);

router.delete('/users/:id', userController.deleteUserById);

router.delete('/users/all/', userController.deleteAllUsers);

module.exports = router;
