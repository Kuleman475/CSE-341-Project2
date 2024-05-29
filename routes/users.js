const routes = require('express').Router();
const userController = require('../controller/users');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

routes.use('/api-docs', swaggerUi.serve);

routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.get('/user', userController.getAllData);

routes.get(`/user/:id`, userController.getSingleData);

routes.post('/create/user', userController.createUser);

routes.put(`/update/user/:id`, userController.updateUser);

routes.delete(`/delete/user/:id`, userController.deleteUser);

module.exports = routes;
