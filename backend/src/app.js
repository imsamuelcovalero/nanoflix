/* src/app.js */
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const swagger = require('swagger-ui-express');

const errorMiddleware = require('./middlewares/error.middleware');
// const swaggerFile = require('./doc/swagger.js');
const routes = require('./routes');
const logger = require('./utils/customLogger');

const app = express();

const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';
logger.info("App", "✅ FRONTEND_URL:", frontendURL);

app.use(cors({ origin: frontendURL }));
app.use(express.json());

// app.use('/docs', swagger.serve, swagger.setup(swaggerFile));

app.use(routes);

app.get('/', (_req, res) => {
  res.send('Servidor funcionando!');
  logger.info("App", "✅ Rota '/' acessada");
});
app.get('/coffee', (_req, res) => {
  res.status(418).end();
  logger.warn("App", "☕ Rota '/coffee' acessada - I'm a teapot!");
});

app.use(errorMiddleware);

module.exports = app;

