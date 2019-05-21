// this is the swagger docs route
var express = require('express');
var router = express.Router();

// GET the swagger docs
router.get('/', function(req, res, next) {
  res.send('swagger docs here...');
});

module.exports = router;
