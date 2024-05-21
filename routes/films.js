const routes = require("express").Router();
const filmsController = require("../controller/films")

routes.get("/films", filmsController.getAllData);

routes.post("/create", filmsController.createFilm);

module.exports = routes;