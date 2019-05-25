// this is the register route
var express = require('express');
var router = express.Router();

/* POST email and password to register a new account into the web_computing database. */
router.post('/', function(req, res, next) {
  // if request body is empty, return bad request
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: 'Error on request body' });
  } else {
    const user = {
      'email': req.body.email,
      'password': req.body.password
    };
    // add new user into the database
    req.db('users').insert(user)
    .then(() => {
      res.status(201).json({ message: `Account successfully registered` });
    }).catch(() => {
      res.status(400).json({ message: 'Error: Account with this email already exists' });
    })
  }
});

module.exports = router;