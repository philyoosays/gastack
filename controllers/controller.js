require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const model = require('../models/models');
const func = require('../functions/helperFunctions');

const app = express();
module.exports = {
  storeBody(req, res, next) {
    res.locals.body = req.body;
    next();
  },

  getAllPrograms(req, res ,next) {
    model.findAllPrograms()
      .then( (data) => {
        res.locals.programs = data;
        next();
      })
      .catch( (err) => {
        next(err);
      })
  },

  getOneUser(req, res, next) {
    const { username } = res.locals.body;
    model.findOneUser(username)
      .then( (data) => {
        res.locals.user = data;
        next();
      })
      .catch( (err) => {
        next(err);
      })
  },



}
