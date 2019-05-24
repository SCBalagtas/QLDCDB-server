// this is the genders route
var express = require('express');
var router = express.Router();

/* GET JSON of distinct gender from the offences table in the web_computing database. */
router.get('/', function(req, res, next) {
  req.db.from('offences').distinct('gender')
  .then((rows) => {
    return rows.map(row => row.gender);
  })
  .then((result) => {
    res.status(200).json({'genders' : result})
  })
  .catch((err) => {
    console.log(err);
    res.json({'Error' : true, 'Message' : 'Error in MySQL query'})
  })
});

module.exports = router;