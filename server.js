var express = require('express');
var mongodbClient = require('mongodb');
var mongodb = require('./db/connect');
var bodyParser = require('body-parser');
const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const axios = require('axios');
require('dotenv').config();

var app = express();
const port = process.env.PORT || 8888;

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/', require('./routes/login'));

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

app.get('/auth', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get('/oauth-callback', ({ query: { code } }, res) => {
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code
  };

  const opts = { headers: { accept: 'application/json' } };

  axios
    .post('https://github.com/login/oauth/access_token', body, opts)
    .then((response) => response.data.access_token)
    .then((token) => {
      // eslint-disable-next-line no-console
      console.log('My token:', token);

      if (token != 'undefined') {
        res.redirect(`/?token=${token}`); //.json("Congratulations you are authorized")
      }
    })
    .catch((err) => res.status(500).json({ err: err.message }));
});
