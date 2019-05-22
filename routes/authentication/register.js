// this is the register route
var express = require('express');
var router = express.Router();

/* POST email and password to register a new account into the web_computing database. */
router.post('/', function(req, res, next) {
  // if request body is empty, return bad request
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: 'Error on request body' });
    console.log('Error on request body:', JSON.stringify(req.body)); // temporary logging
  } else {
    const user = {
      'email': req.body.email,
      'password': req.body.password
    };
    // add new user into the database
    req.db('users').insert(user)
    .then(() => {
      res.status(201).json({ message: `Account successfully registered` });
      console.log('Successful account registration:', JSON.stringify(user)); // temporary logging
    }).catch(() => {
      res.status(400).json({ message: 'Error: Account with this email already exists' });
      console.log('Error: Account with this email already exists', JSON.stringify(req.body)); // temporary logging
    })
  }
});

module.exports = router;