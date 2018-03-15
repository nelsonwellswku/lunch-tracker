const express = require('express');
const bodyParser = require('body-parser');
const addRequestId = require('express-request-id');
const helmet = require('helmet');
const middleware = require('./middleware');
const diagnosticRouter = require('./diagnostic');

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(addRequestId({
    attributeName: 'requestId',
}));

app.use('/diagnostic', diagnosticRouter);

app.use(middleware.notFoundHandler);
app.use(middleware.errorHandler);

module.exports = app;