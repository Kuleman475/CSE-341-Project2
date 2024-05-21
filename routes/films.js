const routes = require("express").Router();
const filmsController = require("../controller/films")

routes.get("/films", filmsController.getAllData);

module.exports = routes;