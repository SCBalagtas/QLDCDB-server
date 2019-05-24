// this is the search route
var express = require('express');
var router = express.Router();

// declare JWT middleware
const jwt = require('jsonwebtoken');

// verify token function
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(401).json({ message: 'Error - Your authorization token is invalid' });
  }
};

/* GET LGA, total, lat and lng from the web_computing database based of provided search parameters. */
router.get('/', verifyToken, function(req, res, next) {
  // verify token
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(401).json({ message: 'Error - Your authorization token is invalid' });
    } else {
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
    }
  })
}, function(req, res, next) {
    // save the query params in a request parameter if the query param exists
    if (req.query.area) {
      req.area = req.query.area.split(',');
    }
    if (req.query.age) {
      req.age = req.query.age.split(',');
    }
    if (req.query.gender) {
      req.gender = req.query.gender.split(',');
    }
    if (req.query.year) {
      req.year = req.query.year.split(',');
    }
    next();
}, function(req, res, next) {
    // build the default search query
    let mainQuery = req.db.from('offences')
          .innerJoin('areas', 'offences.area', 'areas.area')
          .sum(`${req.offence} as total`)
          .select('offences.area', 'lat', 'lng');
    // if query params is not empty, append to the mainQuery
    if (req.area) {
      for (let i = 0; i < req.area.length; i++) {
        mainQuery = mainQuery.orWhere('offences.area', '=', req.area[i]);
      }
    }
    if (req.age) {
      for (let i = 0; i < req.age.length; i++) {
        mainQuery = mainQuery.orWhere('age', '=', req.age[i]);
      }
    }
    if (req.gender) {
      for (let i = 0; i < req.gender.length; i++) {
        mainQuery = mainQuery.orWhere('gender', '=', req.gender[i]);
      }
    }
    if (req.year) {
      for (let i = 0; i < req.year.length; i++) {
        mainQuery = mainQuery.orWhere('year', '=', req.year[i]);
      }
    }
    // search the database with the user's query and group by area
    mainQuery.groupBy('area')
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
      // build a query JSON to include in the response JSON
      let userSearchQuery = {
        'offence': req.query.offence
      } 
      // if query params is not empty, append to the userSearchQuery
      if (req.area) {
        userSearchQuery.area = req.area.toString();
      }
      if (req.age) {
        userSearchQuery.age = req.age.toString();
      }
      if (req.gender) {
        userSearchQuery.gender = req.gender.toString();
      }
      if (req.year) {
        userSearchQuery.year = req.year.toString();
      }
      res.status(200).json({'query' : userSearchQuery, 'result' : result});
    }).catch(() => {
      console.log(err);
      res.json({'Error' : true, 'Message' : err});
    })
});

module.exports = router;