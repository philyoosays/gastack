const express = require('express');
const authService = require('../auth/authService');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express.Router();

app.route('/edit')
  .get(view.showNewPost)

app.route('/search/:tag')
  .get(
    authService.loginRequired,
    control.getAllTags,
    view.showMain,
    view.show404
    )

app.route('/search')
  .get(
    authService.loginRequired,
    control.mainSearch,
    control.searchFailOverLookStart,
    view.showMain,
    view.show404
    )

app.route('/')
  .get(
    authService.loginRequired,
    control.dataInitialize,
    view.showMain,
    view.show404
    )

module.exports = app;
