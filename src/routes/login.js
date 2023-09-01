const express = require('express');
const controller = require('../controllers/login');

const router = express();

router.post('/', controller.login);


module.exports = router;
