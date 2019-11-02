const express = require('express');
const router = express.Router();
const users = require('../Model/user')

router.get('/', (req, res) => {
  users.find({}, (err, result) => {
    if(err) return res.send({ error: 'Erro na consulta de usuários'});
    return res.send(result);
  });
});

router.post('/', (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) return res.send({ error: 'Dados insufucientes' });

  users.findOne({email}, (err,result) => {
    if (err) return res.send({ error: 'Erro ao buscar usuário' });
    if (result) return res.send({ error: 'Usuário já cadastrado' });

    users.create(req.body, (err, result) => {
      if (err) return res.send({ error: 'Erro ao cadastrar usuário' });
      result.password = undefined;ls
      ls
      return res.send(result);
    });
  });
});

module.exports = router;

