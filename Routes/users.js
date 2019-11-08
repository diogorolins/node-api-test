const express = require('express');
const router = express.Router();
const users = require('../Model/user')
const bcrypt = require('bcrypt');

router.get('/', async(req, res) => {
  try{
      const userList = await users.find({});
      res.send(userList);
  } catch(err){
      return res.send({ error: 'Erro na consulta de usuários' });
  }
})


router.post('/', async(req, res) => {
  const{email, password} = req.body;
  if (!email || !password) return res.send({ error: 'Dados insufucientes' });

  try{
    if (await users.findOne({ email })) return res.send({ error: 'Usuário já cadastrado' });
    const user = await users.create(req.body);
    user.password = undefined;
    return res.send(user);
  } 
  catch(err){
    console.log(err);
    return res.send({ error: 'Erro no cadastro do usuário' });
  }

});

router.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send({ error: 'Dados insufucientes' });

  try{
    const user = await users.findOne({ email }).select('+password');
    if (!await users.findOne({ email }).select('+password')) return res.send({ error: 'Usuário não encontrado' });
    if (!await bcrypt.compare(password, user.password)) return res.send({ error: 'Usuário não autenticado' });
    user.password = undefined;
    return res.send(user);
  }
  catch(err){
    console.log(err);
    return res.send({ error: 'Erro na autenticação'});
  }

});

module.exports = router;

