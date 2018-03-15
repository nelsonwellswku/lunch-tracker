const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/alive', (req, res) => {
    res.json({
        isAlive: true,
    });
});

app.use((req, res, next) => {
    // no route matched so turn this into a 404
    res.status(404);
    res.send('Not Found');
    next();
});

app.use((err, req, res, next) => {
    if(res.headersSent) {
        return next(err);
    }

    res.status(500);
    res.send('Internal server error');
});

module.exports = app;