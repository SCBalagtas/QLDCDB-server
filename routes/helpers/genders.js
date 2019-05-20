// this is the genders route
var express = require('express');
var router = express.Router();

// simple logging
router.get('/', function(req, res, next) {
  res.send('genders route here...');
});

module.exports = router;