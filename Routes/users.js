const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const userController = new UserController();

router.get('/', userController.listUsers());

router.post('/', userController.createUser());

router.post('/auth', userController.authUser() );

module.exports = router;

