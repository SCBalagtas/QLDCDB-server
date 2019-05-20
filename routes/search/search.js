// this is the search route
var express = require('express');
var router = express.Router();

// simple logging
router.get('/', function(req, res, next) {
  res.send('search route here...');
});

module.exports = router;