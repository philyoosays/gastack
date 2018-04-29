const express = require('express');
const authService = require('../auth/authService');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express.Router();

app.route('/post/new')
  .get(
    view.showNewPost
    )
  .post(
    control.makeNewPost
    )

app.route('/search/tag/:tag')
  .get(
    authService.loginRequired,
    control.getAllTags,
    view.showMain,
    view.show404
    )

app.route('/post/:postid')
  .get(
    authService.loginRequired,
    control.dataInitialize,
    control.updateSavedSearch,
    control.getOnePost,
    view.showOnePost,
    view.show404
    )

app.route('/search')
  .get(
    authService.loginRequired,
    control.dataInitialize,
    control.mainSearch,
    control.searchFailOverLookStart,
    control.saveSearch,
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
