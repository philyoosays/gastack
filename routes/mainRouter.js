const express = require('express');
const authService = require('../auth/authService');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express.Router();

app.route('/')
  .get(
    authService.loginRequired,
    view.showMain
    )

module.exports = app;
