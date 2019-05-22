// this is the ages route
var express = require('express');
var router = express.Router();

/* GET JSON of distinct age from the offences table in the web_computing database. */
router.get('/', function(req, res, next) {
  req.db.from('offences').distinct('age')
  .then((rows) => {
    return rows.map(row => row.age);
  })
  .then((result) => {
    res.json({'ages' : result})
  })
  .catch((err) => {
    console.log(err);
    res.json({'Error' : true, 'Message' : 'Error in MySQL query'})
  })
});

module.exports = router;