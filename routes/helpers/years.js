// this is the years route
var express = require('express');
var router = express.Router();

/* GET JSON of distinct year from the offences table in the web_computing database. */
router.get('/', function(req, res, next) {
  req.db.from('offences').distinct('year')
  .then((rows) => {
    return rows.map(row => row.year);
  })
  .then((result) => {
    res.status(200).json({'years' : result})
  })
  .catch((err) => {
    console.log(err);
    res.json({'Error' : true, 'Message' : 'Error in MySQL query'})
  })
});

module.exports = router;