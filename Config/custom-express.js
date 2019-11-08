const express = require('express');
const app = express();


const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const indexRoute = require('../Routes/index');
const usersRoute = require('../Routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

module.exports = app;