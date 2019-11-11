const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const userController = new UserController();

router.get('/', userController.authToken(), (req,res) => {
  return res.send({message: 'Raiz do projeto'});
})

router.post('/', (req, res) => {
  return res.send({ message: 'Raiz do projeto' });
})

module.exports = router;