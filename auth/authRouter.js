const express = require('express');
const authService = require('./authService');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express();

app.route('/register/cohorts')
  .post(
    control.getAllCohorts,
    view.handleCohortSend,
    view.show404
    )

app.route('/register/user')
  .post(
    control.checkUsername,
    view.handleUserCheckSend,
    view.show404
    )

app.route('/register')
  .get(
    control.getAllPrograms,
    view.showRegisterForm,
    view.show404
    )
  .post(
    control.storeBody,
    control.getOneUser,
    // authService.isApprovedPerson,
    authService.checkPasswordTypo, //fix the else statement
    authService.doesUserExist, //fix the else statement
    authService.generatePassword,
    authService.registerUser,
    authService.handleLogin,
    view.show404
    )

app.route('/logout')
  .get(
    authService.logout,
    view.show404
    )

app.route('/')
  .get(
    view.showLoginForm,
    view.show404
    )
  .post(
    authService.login,
    authService.handleLogin,
    view.show404
    );


// app.use((err, req, res, next) => {
//   console.error(err);
//   res.json({ error: err });
// });

module.exports = app;
