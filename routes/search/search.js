// this is the search route
var express = require('express');
var router = express.Router();

/* GET LGA, total, lat and lng from the web_computing database based of provided search parameters. */
   router.get('/', function(req, res, next) {
    // if the offence parameter in the request query is empty, return bad request
    if (!req.query.offence) {
      res.status(400).json({ message: 'Error on request query - you are missing the offence paramter' });
      console.log('Error on request query:', JSON.stringify(req.query.offence)); // temporary logging
    } else {
      const pretty = {
        'pretty': req.query.offence
      };
      // get the equivalent column in the offence_columns table from the database to use in the search query
      req.db.from('offence_columns').select('*').where(pretty)
      .then(row => {
        return row.map(row => row.column)
      })
      .then((offence) => {
        req.offence = offence[0];
        next();
      }).catch(() => {
        console.log(err);
        res.json({'Error' : true, 'Message' : err})
      })
   }
  }, function(req, res, next) {
      // search the database with the user's query
      req.db.from('offences')
            .innerJoin('areas', 'offences.area', 'areas.area')
            .sum(`${req.offence} as total`)
            .select('offences.area', 'lat', 'lng')
            .groupBy('area')
      .then((rows) => {
        // format the JSON that will be returned
        return rows.map(row => ({
          'LGA'   : row.area,
          'total' : row.total,
          'lat'   : row.lat,
          'lng'   : row.lng
        }));
      })
      .then((result) => {
        res.json({'query' : {'offence': req.offence}, 'result' : result})
      }).catch(() => {
        console.log(err);
        res.json({'Error' : true, 'Message' : err})
      })
  });

module.exports = router;