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
  .post(
    authService.loginRequired,
    control.dataInitialize,
    control.getOneCommentForEdit,
    view.handlePostSend
    )
  .put(
    authService.loginRequired,
    control.getResourceId,
    control.updateResource,
    view.handleNewResource,
    view.show404
    )

app.route('/comment/:commentid/delete')
  .put(
    authService.loginRequired,
    control.getCommentId,
    control.deleteComment,
    view.handleNewPost
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
  .post(
    authService.loginRequired,
    control.dataInitialize,
    control.getOneCommentForEdit,
    view.handlePostSend
    )
  .put(
    authService.loginRequired,
    control.modeEditComment,
    control.getCommentId,
    control.updateComment,
    control.saveBackup,
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
    control.modeNewComment,
    control.makeNewComment,
    control.saveBackup,
    control.getUserScoreCount,
    control.updateUserScore,
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
    control.getOnePostForEdit,
    view.handlePostSend
    )
  .put(
    authService.loginRequired,
    control.modeEditPost,
    control.getPostId,
    control.updatePost,
    control.saveBackup,
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
    control.modeNewPost,
    control.makeNewPost,
    control.saveBackup,
    control.getUserScoreCount,
    control.updateUserScore,
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

app.route('/tutorial/:postid')
  .get(
    authService.loginRequired,
    control.dataInitialize,
    control.modeNewTutorial,
    control.userType,
    control.getPostId,
    control.userTag,
    control.updateTutorialSearch,
    control.checkUserViewTutorial,
    control.storeTutorialView,
    control.getOneTutorial,
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

app.route('/tutorials/new')
  .get(
    authService.loginRequired,
    control.modeNewTutorial,
    view.showTextEditor,
    view.show404
    )
  .post(
    authService.loginRequired,
    control.makeNewTutorial,
    view.handleNewTutorial,
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
    control.getUserScoreCount,
    view.showMain,
    view.show404
    )

app.route('/tutorials/search')
  .get(
    authService.loginRequired,
    control.dataInitialize,
    control.userType,
    control.modeAllTutorials,
    control.findTutorials,
    control.tutorialsFailOverLookStart,
    control.saveTutorialSearch,
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
    control.getUserScoreCount,
    view.showMain,
    view.show404
    )

app.route('/tutorials')
  .get(
    authService.loginRequired,
    control.dataInitialize,
    control.readUserScore,
    control.userType,
    control.modeAllTutorials,
    control.getAllTutorials,
    view.showMain,
    view.show404
    )

app.route('/vote')
  .post(
    authService.loginRequired,
    control.getOneVote,
    control.saveEditVote,
    control.getVoteSum,
    control.getUserScoreCount,
    control.updateUserScore,
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
    control.readUserScore,
    control.mainSearch,
    control.searchFailOverLookStart,
    control.saveSearch,
    control.getUserScoreCount,
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
    control.readUserScore,
    control.modeMain,
    control.getAllNewPosts,
    control.getUserScoreCount,
    view.showMain,
    view.show404
    )

module.exports = app;
