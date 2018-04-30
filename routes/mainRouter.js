const express = require('express');
const authService = require('../auth/authService');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express.Router();

app.route('/post/new')
  .get(
    control.modeNewPost,
    view.showTextEditor
    )
  .post(
    control.makeNewPost,
    view.handleNewPost,
    view.show404
    )

app.route('/comment/:postid/new')
  .get(
    control.printData,
    control.modeNewComment,
    control.getPostId,
    view.showTextEditor,
    view.show404
    )
  .post(
    control.makeNewComment,
    view.handleNewPost,
    view.show404
    )

app.route('/search/tag/:tag')
  .get(
    authService.loginRequired,
    control.dataInitialize,
    control.getAllTags,
    view.showMain,
    view.show404
    )

app.route('/post/:postid')
  .get(
    authService.loginRequired,
    control.printData,
    control.handleVote,
    control.dataInitialize,
    control.updateSavedSearch,
    control.getOnePost,
    control.getAllComments,
    view.showOnePost,
    view.show404
    )
  .post()

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
