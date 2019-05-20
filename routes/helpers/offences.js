// this is the offences route
var express = require('express');
var router = express.Router();

// simple logging
router.get('/', function(req, res, next) {
  res.send('offences route here...');
});

module.exports = router;