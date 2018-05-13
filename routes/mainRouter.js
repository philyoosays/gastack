const express = require('express');
const authService = require('../auth/authService');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express.Router();

app.route('/resources/:resourceid/edit')
  .get(
    authService.loginRequired,
    control.dataInitialize,
    control.modeEditResource,
    control.getResourceId,
    control.getOneResource,
    view.showTextEditor,
    view.show404
    )
  .put(
    authService.loginRequired,
    control.getResourceId,
    control.updateResource,
    view.handleNewResource,
    view.show404
    )

app.route('/comment/:commentid/edit')
  .get(
    authService.loginRequired,
    control.dataInitialize,
    control.modeEditComment,
    control.getCommentId,
    control.getOneComment,
    view.showTextEditor,
    view.show404
    )
  .put(
    authService.loginRequired,
    control.getCommentId,
    control.updateComment,
    view.handleNewPost,
    view.show404
    )

app.route('/comment/:postid/new')
  .get(
    authService.loginRequired,
    control.modeNewComment,
    control.getPostId,
    control.getOnePost,
    view.showTextEditor,
    view.show404
    )
  .post(
    authService.loginRequired,
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

app.route('/post/:postid/delete')
  .put(
    authService.loginRequired,
    control.getPostId,
    control.deletePost,
    view.sendBackToMain,
    view.show404
    )

app.route('/post/:postid/edit')
  .get(
    authService.loginRequired,
    control.dataInitialize,
    control.modeEditPost,
    control.getPostId,
    control.getOnePost,
    view.showTextEditor,
    view.show404
    )
  .post(
    authService.loginRequired,
    control.dataInitialize,
    control.getOnePostForPost,
    view.handlePostSend
    )
  .put(
    authService.loginRequired,
    control.getPostId,
    control.updatePost,
    view.handleNewPost,
    view.show404
    )

app.route('/post/new/tags')
  .get(
    control.getTagsFullList,
    view.handleTagSend,
    view.show404
    )

app.route('/post/new')
  .get(
    authService.loginRequired,
    control.modeNewPost,
    view.showTextEditor,
    view.show404
    )
  .post(
    authService.loginRequired,
    control.makeNewPost,
    view.handleNewPost,
    view.show404
    )

app.route('/post/:postid')
  .get(
    authService.loginRequired,
    control.dataInitialize,
    control.userType,
    control.getPostId,
    control.userTag,
    control.updateSavedSearch,
    control.checkUserView,
    control.storeView,
    control.getOnePost,
    control.getAllComments,
    view.showOnePost,
    view.show404
    )

app.route('/profile/edit')
  .get(
    authService.loginRequired,
    control.getUserDetails,
    control.getUserProgramCohort,
    view.showUserDetailsEdit,
    view.show404
    )

app.route('/resources/new')
  .get(
    authService.loginRequired,
    control.modeNewResource,
    view.showTextEditor,
    view.show404
    )
  .post(
    authService.loginRequired,
    control.makeNewResource,
    view.handleNewResource,
    view.show404
    )

app.route('/resources/search')
  .get(
    authService.loginRequired,
    control.dataInitialize,
    control.userType,
    control.modeAllResources,
    control.findResources,
    control.resourcesFailOverLookStart,
    view.showMain,
    view.show404
    )

app.route('/resources')
  .get(
    authService.loginRequired,
    control.dataInitialize,
    control.userType,
    control.modeAllResources,
    control.getAllResources,
    view.showMain,
    view.show404
    )

app.route('/vote')
  .post(
    authService.loginRequired,
    control.getOneVote,
    control.saveEditVote,
    control.getVoteSum,
    view.handleVoteSend
    )

app.route('/messages')
  .get(
    authService.loginRequired,
    control.getAllTheMessages,
    view.handleMessageSend,
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

app.route('/api')
  .get((req, res) => {
    res.send('allgood')
  })

app.route('/')
  .get(
    authService.loginRequired,
    control.dataInitialize,
    control.modeMain,
    control.getAllNewPosts,
    view.showMain,
    view.show404
    )

module.exports = app;
