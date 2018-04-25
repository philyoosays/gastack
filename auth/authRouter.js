const express = require('express');
const authService = require('./authService');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express();

app.route('/register')
  .get(
    control.getAllPrograms,
    view.showRegisterForm,
    view.show404
    )
  .post(
    control.getOneUser,
    control.checkPasswordTypo,
    control.doesUserExist,
    control.generatePassword,
    control.registerUser,
    view.show404
    )

app.route('/')
  .get(
    view.showLoginForm,
    view.show404
    )
  .post(authService.login);


// app.use((err, req, res, next) => {
//   console.error(err);
//   res.json({ error: err });
// });

module.exports = app;
