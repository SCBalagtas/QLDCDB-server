// this is the years route
var express = require('express');
var router = express.Router();

// simple logging
router.get('/', function(req, res, next) {
  res.send('years route here...');
});

module.exports = router;