const express = require('express');
const router = express.Router();
const handlers = require('./handlers');

router.get('/healthCheck', handlers.healthCheck);
router.get('/error', handlers.error);

module.exports = router;
