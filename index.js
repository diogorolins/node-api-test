require('dotenv/config');
const app = require('./Config/custom-express');

app.listen(process.env.PORT, () => console.log('Servidor rodando na porta 3000...'));

