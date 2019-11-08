const mongoose = require('mongoose');
const url = 'mongodb+srv://admin:admin@clusterapi-viwb1.mongodb.net/test?retryWrites=true&w=majority';
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