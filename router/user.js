const express = require('express');
const Router = express.Router();

const user = require('../controller/user');

//for signup
Router.post('/signup/', user.signupUser);

//for login password authorisation
Router.post('/login/', user.loginPasswordAuth);

module.exports = Router;
