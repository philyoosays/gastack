const express = require('express');
const authService = require('../auth/authService');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express.Router();

app.route('/search')
  .get(
    // authService.loginRequired,
    control.mainSearch,
    control.dataInitialize,
    view.showMain,
    view.show404
    )

app.route('/')
  .get(
    // authService.loginRequired,
    control.dataInitialize,
    view.showMain,
    view.show404
    )

module.exports = app;
