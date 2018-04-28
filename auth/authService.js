const bcrypt = require('bcrypt');
const model = require('../models/models');

module.exports = {
   async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await model.findOneUser(username);
      const isValidPass = await bcrypt.compare(password, user[0].password_digest);
      if (!isValidPass) {
        throw { message: 'bad password'}
      }
      req.session.user = user;
      next();
    } catch (err) {
      next(err);
    }
  },

  async generatePassword(req, res, next) {
  const { password } = req.body;
  await bcrypt.hash(password, 11)
    .then( (hash) => {
      res.locals.user = req.body;
      res.locals.user.password_digest = hash;
      next();
    })
    .catch( (err) => {
      next(err);
    })
  },

  checkPasswordTypo(req, res, next) {
    if(req.body.password === req.body.passwordCheck) {
      next();
    } else {
      res.send('Passwords do not match');
    }
  },

  doesUserExist(req, res, next) {
    if(res.locals.user.length === 0) {
        next();
    } else {
      res.send('User already exists')
    }
  },

  registerUser(req, res, next) {
    model.addUser(res.locals.user)
      .then( (data) => {
        res.json(data);
      })
  },

  handleLogin(req, res, next) {
    res.redirect('/main')
  },

  logout(req, res, next) {
    req.session.user = [];
    res.redirect('/')
  },

  loginRequired: [
   (req, res, next) => {
      if(req.session.user) {
        next();
      }
    },
    (err, req, res, next) => {
      res.redirect('/unauthorized')
    }
  ],
};




