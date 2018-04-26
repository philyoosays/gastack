const express = require('express');

const control = require('../controllers/controller');
const view = require('../controllers/viewController');
const authService = require('../auth/authService');

const app = express.Router();

app.route('/')
  .get(
    control.getOneUser,
    view.showProfile,
    view.show404
    )

module.exports = app;
