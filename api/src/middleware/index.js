const notFoundHandler = (req, res) => {
    res.status(404);
    res.send('Not Found');
    next();
};

const errorHandler = (err, req, res, next) => {
    console.log({
        requestId: req.requestId,
        error: err,
    });

    if(res.headersSent) {
        return next(err);
    }

    res.status(500);
    res.send('Internal Server Error');
};

module.exports = {
    notFoundHandler,
    errorHandler,
}