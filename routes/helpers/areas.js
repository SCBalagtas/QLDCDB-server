// this is the areas route
var express = require('express');
var router = express.Router();

// simple logging
router.get('/', function(req, res, next) {
  res.send('areas route here...');
});

module.exports = router;