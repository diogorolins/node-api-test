require('dotenv/config');
const jwt = require('jsonwebtoken');

class TokenController{

  static authToken() {
    return (req, res, next) => {
      console.log('Middlewere token ativado')
      const token_header = req.headers.token;
      if (!token_header) return res.status(401).json({ error: 'Falha na autenticação.' })
      jwt.verify(token_header, process.env.TOKEN_PASSWORD, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Falha na autenticação.' })
        return next();
      });
    };
  }

  static createUserToken(userId) {
    return jwt.sign({ id: userId }, process.env.TOKEN_PASSWORD, { expiresIn: '7d' });
  }

}

module.exports = TokenController;