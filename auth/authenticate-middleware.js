jwt = require('jsonwebtoken');
const secret = require('../config/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.auth;
  console.log(token);

  if (!token) {
    res.status(400).json({ error: 'Unauthorized request' });
  } else {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ you: 'shall not pass!' });
      } else {
        next();
      }
    })
  }
};
