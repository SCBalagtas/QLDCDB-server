// this is the register route
var express = require('express');
var router = express.Router();

// simple logging
router.get('/', function(req, res, next) {
  res.send('register route here...');
});

module.exports = router;