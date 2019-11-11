require('dotenv/config');

const mongoose = require('mongoose');
const url = process.env.DB_CONNECTION;
const options = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 5,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', err => console.log('Erro ao conectar ao banco de dados. ' + err));
mongoose.connection.on('disconnected', () => console.log('Banco de dados desconectado. '));
mongoose.connection.on('connected', () => console.log('Banco de dados conectado. '));
  

module.exports = mongoose;