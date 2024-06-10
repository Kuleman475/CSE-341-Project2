const routes = require('express').Router();
const authController = require('../controller/auth');

routes.get('/?token=:token', authController.getToken)

module.exports = routes;