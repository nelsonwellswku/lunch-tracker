const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const addRequestId = require('express-request-id');
const helmet = require('helmet');
const { errors: celebrateErrors } = require('celebrate');
const middleware = require('./middleware');
const diagnosticRouter = require('./diagnostic');
const authenticationRouter = require('./authentication');

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(addRequestId({
  attributeName: 'requestId',
}));

app.use('/api/diagnostic', diagnosticRouter);
app.use('/api/authentication', authenticationRouter);

app.use(celebrateErrors());
app.use(middleware.notFoundHandler);
app.use(middleware.errorHandler);

module.exports = app;
