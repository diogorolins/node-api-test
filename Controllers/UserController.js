require('dotenv/config');
const users = require('../Model/user')
const bcrypt = require('bcrypt'); 
const Token = require('../Services/Token');

class UserController{

  listUsers(){
    return async (req, res) => {
      try {
        const userList = await users.find({});
        res.send(userList);
      } catch (err) {
        return res.status(500).json({ error: 'Erro na consulta de usuários' });
      }
    }
  }

  createUser(){
    return async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ error: 'Dados insufucientes' });

      try {
        if (await users.findOne({ email })) return res.status(400).send({ error: 'Usuário já cadastrado' });
        const user = await users.create(req.body);
        user.password = undefined;
        return res.json({ user, token: Token.createUserToken(user.id) });
      }
      catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Erro no cadastro do usuário' });
      }

    }
  }

  deleteUser(){
    return async (req, res) => {
      try{
        await users.findByIdAndRemove(req.params.id, { useFindAndModify: false});
        return res.status(204).send();
      }
      catch(err){
        return res.status(500).json({ erro: 'Erro ao apagar o usuário.'});
      }
    };

  }


}

module.exports = UserController;