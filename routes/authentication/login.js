// this is the login route
var express = require('express');
var router = express.Router();

// simple logging
router.get('/', function(req, res, next) {
  res.send('login route here...');
});

module.exports = router;