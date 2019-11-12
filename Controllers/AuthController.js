require('dotenv/config');
const users = require('../Model/user')
const bcrypt = require('bcrypt'); 
const Token = require('../Services/Token');

class AuthController{
  

  authUser() {

    return async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ error: 'Dados insufucientes' });

      try {
        const user = await users.findOne({ email }).select('+password');
        if (!await users.findOne({ email }).select('+password')) return res.status(400).send({ error: 'Usuário não encontrado' });
        if (!await bcrypt.compare(password, user.password)) return res.status(401).send({ error: 'Usuário não autenticado' });
        user.password = undefined;
        return res.json({ user, token: Token.createUserToken(user.id) });
      }
      catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Erro na autenticação' });
      }

    }
  }

}

module.exports = AuthController;