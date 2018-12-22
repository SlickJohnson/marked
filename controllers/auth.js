const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = app => {
  // SIGN UP FORM
  app.get('/sign-up', (req, res) => {
    res.render('sign-up');
  });

  // SIGN UP POST
  app.post('/sign-up', (req, res) => {
    // Create user
    const user = new User(req.body);

    user
      .save()
      .then(user => {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
          expiresIn: '60 days',
        });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.redirect('/');
      })
      .catch(err => {
        console.log(err.message);
        return res.status(400).send({ err });
      });
  });

  app.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
  });

  // LOGIN FORM
  app.get('/login', (req, res) => {
    res.render('login');
  });

  // LOGIN
  app.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username }, 'username password')
      .then(user => {
        if (!user) {
          return res.stats(401).send({ message: 'Wrong Username or Password' });
        }

        user.comparePassword(password, (err, isMatch) => {
          if (!isMatch) {
            return res
              .status(401)
              .send({ message: 'Wrong Username or Password' });
          }

          const token = jwt.sign(
            { _id: user._id, username: user.username },
            process.env.SECRET,
            {
              expiresIn: '60 days',
            },
          );

          res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
          res.redirect('/');
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};
