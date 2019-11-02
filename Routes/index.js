const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  return res.send({message: 'Raiz do projeto'});
})

router.post('/', (req, res) => {
  return res.send({ message: 'Raiz do projeto' });
})

module.exports = router;