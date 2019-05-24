// this is the login route
var express = require('express');
var router = express.Router();

// declare JWT middleware
const jwt = require('jsonwebtoken');

/* POST email and password to check if user exists in the web_computing database. 
   If user exists, send back a JSON web token. */
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
    // check if the user exists in the database
    req.db.from('users').select('id','email', 'password').where(user)
    .then((row) => {
      // throw if no user is found
      if (row.length > 0) {
        // create a payload for the jwt
        const payload = {
          'id': row[0].id,
          'email': row[0].email
        }
        // generate and return jwt
        jwt.sign({ user: payload }, 'secretkey', { expiresIn: 86400 }, (err, token) => {
          res.status(200).json({ token: token, 
                                 access_token: token, 
                                 token_type: 'Bearer', 
                                 expires_in: 86400 });
          console.log('Successful login:', JSON.stringify(user)); // temporary logging
        });
      } else {
        throw new Error('Invalid login - incorrect email or password');
      }

    }).catch((err) => {
      res.status(401).json({ message: err });
      console.log('Error: Invalid login - incorrect email or password', JSON.stringify(req.body)); // temporary logging
    })
  }
});


module.exports = router;