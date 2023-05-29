const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Spic API',
      version: '1.0.0',
    },
  },
  apis: ['C:\Users\User\Documents\final-project\Spic\server\src\routes*', 'C:\Users\User\Documents\final-project\Spic\server\src\server\app.ts'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
