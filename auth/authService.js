const bcrypt = require('bcrypt');
const model = require('../models/models');
const func = require('../functions/helperFunctions');

module.exports = {
   async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await model.findOneUserPass(username);
      const isValidPass = await bcrypt.compare(password, func.killArray(user).password_digest);
      if (!isValidPass) {
        res.locals.username = username;
        next(err);
      }
      req.session.user = user;
      next();
    } catch (err) {
      next(err);
    }
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

  isApprovedPerson(req, res, next) {
    model.findApprovedPerson(res.locals.body.email)
    .then( (data) => {
      if(data.length === 0) {
        res.send('Is not an approved person')
      } else {
        next();
      }
    })
    .catch( (err) => {
      next(err);
    })
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

  registerUser(req, res, next) {
    model.addUser(res.locals.user)
      .then( (data) => {
        req.session.user = data;
        next();
      })
      .catch((err) => {
        next(err);
      })
  },

  handleLogin(req, res, next) {
    if(req.session.user) {
      res.redirect('/main')
    } else {
      res.redirect('/login')
    }
  },

  logout(req, res, next) {
    req.session.destroy((err) => {
      res.redirect('/')
    })
  },

  isLoggedIn(req, res, next) {
    let date = new Date()
    if(req.session.cookie._expires > date) {
      console.log('this is running')
      res.json({loggedin: true})
    } else {
      console.log('user is not logged in', req.session.user)
      res.end()
    }
  },

  loginRequired: [
   (req, res, next) => {
      if(req.session.user) {
        next();
      } else {
        res.redirect('/login')
      }
    },
    (err, req, res, next) => {
      res.redirect('/unauthorized')
    }
  ],
};




