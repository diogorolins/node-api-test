const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const userController = new UserController();
const Token = require('../Services/Token');

router.get('/', Token.authToken(), (req,res) => {
  return res.send({message: 'Raiz do projeto'});
})

router.post('/', (req, res) => {
  return res.send({ message: 'Raiz do projeto' });
})

module.exports = router;