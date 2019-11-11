const users = require('../Model/user')
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

class UserController{

  authToken(){
    return (req, res, next) => {
      console.log('Middlewere token ativado')
      const token_header = req.headers.token;
      if(!token_header) return res.status(401).send({ error: 'Falha na autenticação.'})
      jwt.verify(token_header, '123456' , (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Falha na autenticação.'})
        return next();
      });
    };
  }

  createUserToken(userId){
    return jwt.sign({id: userId}, '123456', { expiresIn: '7d' });
  }

  listUsers(){
    return async (req, res) => {
      try {
        const userList = await users.find({});
        res.send(userList);
      } catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de usuários' });
      }
    }
  }

  createUser(){
    return async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).send({ error: 'Dados insufucientes' });

      try {
        if (await users.findOne({ email })) return res.status(400).send({ error: 'Usuário já cadastrado' });
        const user = await users.create(req.body);
        user.password = undefined;
        return res.send({ user,token: this.createUserToken(user.id) });
      }
      catch (err) {
        console.log(err);
        return res.status(500).send({ error: 'Erro no cadastro do usuário' });
      }

    }
  }

  authUser(){

    return async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).send({ error: 'Dados insufucientes' });

      try {
        const user = await users.findOne({ email }).select('+password');
        if (!await users.findOne({ email }).select('+password')) return res.status(400).send({ error: 'Usuário não encontrado' });
        if (!await bcrypt.compare(password, user.password)) return res.status(401).send({ error: 'Usuário não autenticado' });
        user.password = undefined;
        return res.send({ user, token: this.createUserToken(user.id) });
      }
      catch (err) {
        console.log(err);
        return res.status(500).send({ error: 'Erro na autenticação' });
      }

    }
  }
}

module.exports = UserController;