const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Films',
    description: 'Films'
  },
  host: 'localhost:8888',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endPoints = ['./routes/users.js', './routes/films.js'];

swaggerAutogen(outputFile, endPoints, doc);
