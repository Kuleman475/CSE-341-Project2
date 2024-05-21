const routes = require("express").Router();

const userController = require("../controller/users")

routes.get("/", userController.getAllData);

routes.get(`/:id`, userController.getSingleData);

module.exports = routes;