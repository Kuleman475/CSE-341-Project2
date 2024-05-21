const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Films", 
        description: "users",
    },
    host: "localhost:8888", 
    schemes: ['http'], 
    };

const outputFile = './swagger.json';
const endPoints = ['./routes/contacts.js']

swaggerAutogen(outputFile, endPoints, doc);