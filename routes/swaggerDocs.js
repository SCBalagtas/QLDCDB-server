// this is the swagger docs route
var express = require('express');
var router = express.Router();

// declare swagger-ui middleware
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../docs/QLDCDBswagger.json');

// use swagger router
router.use('/', swaggerUI.serve);

// GET the swagger docs
router.get('/', swaggerUI.setup(swaggerDocument));

module.exports = router;
