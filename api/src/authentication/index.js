const express = require('express');
const handlers = require('./handlers');

const router = express.Router();
router.post('/login', handlers.login);
router.get('/logout', handlers.logout);
router.post('/registerUser', handlers.registerUser);
router.post('/resetPassword', handlers.resetPassword);

module.exports = router;
