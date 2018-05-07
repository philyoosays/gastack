const express = require('express');

const control = require('../controllers/controller');
const view = require('../controllers/viewController');
const authService = require('../auth/authService');

const app = express.Router();

app.route('/edit')
  .get(
    authService.loginRequired,
    control.getOwnUsername,
    control.getUserDetails,
    control.getUserProgramCohort,
    view.showUserDetailsEdit,
    view.show404
    )
  .post(
    authService.loginRequired,
    control.updateProfile,
    view.handleProfileUpdate,
    view.show404
    )

app.route('/:username')
  .get(
    authService.loginRequired,
    control.dataInitialize,
    control.userType,
    control.userTag,
    control.getUsername,
    control.getUserDetails,
    control.getUserProgramCohort,
    control.getAllUserPosts,
    view.showUserProfile,
    view.show404
    )

app.route('/')
  .get(
    authService.loginRequired,
    control.getOwnUsername,
    view.handleProfileButton,
    view.show404
    )


module.exports = app;
