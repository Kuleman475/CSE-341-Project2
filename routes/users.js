const routes = require('express').Router();
const userController = require('../controller/users');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const validation = require('../validator.js');

routes.use('/api-docs', swaggerUi.serve);

routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.get('/user', userController.getAllData);

routes.get(`/user/:id`, userController.getSingleData);

routes.post('/create/user', validation.userValidate, userController.createUser);

routes.put(`/update/user/:id`, validation.userValidate, userController.updateUser);

routes.delete(`/delete/user/:id`, userController.deleteUser);

module.exports = routes;
