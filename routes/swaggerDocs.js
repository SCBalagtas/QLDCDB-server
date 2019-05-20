// this is the swagger docs route
var express = require('express');
var router = express.Router();

// GET the swagger docs
router.get('/', function(req, res, next) {
  res.send('Swagger docs here...');
});

module.exports = router;
