// this is the ages route
var express = require('express');
var router = express.Router();

// simple logging
router.get('/', function(req, res, next) {
  res.send('ages route here...');
});

module.exports = router;