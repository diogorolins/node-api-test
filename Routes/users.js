const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const userController = new UserController();
const AuthController = require('../Controllers/AuthController');
const authController = new AuthController();

router.get('/', userController.listUsers());

router.post('/', userController.createUser());

router.delete('/:id', userController.deleteUser());

router.post('/auth', authController.authUser());

router.get('/auth', authController.logOutUser());

module.exports = router;

