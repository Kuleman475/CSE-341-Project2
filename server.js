var express = require('express');
var mongodbClient = require('mongodb');
var mongodb = require('./db/connect');
var bodyParser = require('body-parser');
const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var app = express();
const port = process.env.PORT || 8888;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/user', require('./routes/users'));

app.use('/film', require('./routes/films'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port} :) and is connected to DataBase :)`);
    });
  }
});
