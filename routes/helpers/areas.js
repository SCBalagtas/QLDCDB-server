// this is the areas route
var express = require('express');
var router = express.Router();

/* GET JSON of area from the areas table in the web_computing database. */
router.get('/', function(req, res, next) {
  req.db.from('areas').select('area')
  .then((rows) => {
    return rows.map(row => row.area);
  })
  .then((result) => {
    res.json({'areas' : result})
  })
  .catch((err) => {
    console.log(err);
    res.json({'Error' : true, 'Message' : 'Error in MySQL query'})
  })
});


module.exports = router;