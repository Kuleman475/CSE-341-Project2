const routes = require('express').Router();
const loginController = require('../controller/login');

routes.get('/login', loginController.loginUser);


module.exports = routes;