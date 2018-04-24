const express = require('express');
const authService = require('./authService');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express();

app.route('/register')
  .get(view.showRegisterForm, view.show404)
  .post()

app.route('/')
  .get(view.showLoginForm, view.show404)
  // .post(AuthService.login, view.handleCreateUser);


// app.use((err, req, res, next) => {
//   console.error(err);
//   res.json({ error: err });
// });

module.exports = app;
