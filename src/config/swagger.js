const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Hospitalaria',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // Usamos path.join para que no haya pierde con las carpetas
  apis: [path.join(__dirname, '../application/routes/*.js')], 
};

const specs = swaggerJsdoc(options);
module.exports = specs;