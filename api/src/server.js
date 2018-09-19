const logger = require('./infrastructure/logger');
const app = require('./app');

const port = process.env.PORT || 8000;
app.listen(port, () => logger.info(`Listening on port ${port}.`));
