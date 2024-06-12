const routes = require('express').Router();
const loginController = require('../controller/login');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

routes.get('/login', loginController.loginUser);

routes.use('/success/:username/api-docs', swaggerUi.serve);

routes.get('/success/:username/api-docs', swaggerUi.setup(swaggerDocument));

routes.get('/logout', loginController.logoutUser);

module.exports = routes;
