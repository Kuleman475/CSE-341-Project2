const routes = require('express').Router();
const filmsController = require('../controller/films');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const validation = require('../validator.js');

// routes.use('/api-docs', swaggerUi.serve);

// routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.get('/films', filmsController.getAllData);

routes.post('/create/film', validation.filmValidate, filmsController.createFilm);

routes.get('/film/:id', filmsController.getDataId);

routes.put('/update/film/:id', validation.filmValidate, filmsController.updateFilm);

routes.delete('/delete/film/:id', filmsController.deleteFilm);

module.exports = routes;
