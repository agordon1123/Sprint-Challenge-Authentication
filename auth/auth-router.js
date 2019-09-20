const router = require('express').Router();
const bcrypt = require('bcrypt');

const Users = require('./auth-model.js');
const generateToken = require('./generateToken.js');

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).json({ error: 'Bad request' });
  } else {
    const hash = bcrypt.hashSync(password, 8);
    req.body.password = hash;

    Users.add(req.body)
      // Would like to update to send back the newly created user
      // Could also update to login in the user immediately upon register
      .then(success => {res.status(201).json(success)})
      .catch(err => res.status(500).json(err));
  };
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ error: 'Bad request' });
  } else {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: 'Welcome', auth: token })
        } else {
          res.status(401).json({ error: 'Bad request' });
        }
      })
      .catch(err => res.status(500).json({ error: 'Server error' }));
  }
});

module.exports = router;
