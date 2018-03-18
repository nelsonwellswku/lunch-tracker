const express = require('express');
const handlers = require('./handlers');

const router = express.Router();
router.get('/healthCheck', handlers.healthCheck);
router.get('/error', handlers.error);

module.exports = router;
