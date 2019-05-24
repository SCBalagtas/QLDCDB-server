// this is the offences route
var express = require('express');
var router = express.Router();

/* GET JSON of pretty from the offence_columns table in the web_computing database. */
router.get('/', function(req, res, next) {
  req.db.from('offence_columns').select('pretty')
  .then((rows) => {
    return rows.map(row => row.pretty);
  })
  .then((result) => {
    res.status(200).json({'offences' : result})
  })
  .catch((err) => {
    console.log(err);
    res.json({'Error' : true, 'Message' : 'Error in MySQL query'})
  })
});

module.exports = router;