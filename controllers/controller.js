require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const model = require('../models/models');
const vector = require('../models/vectorModels')
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

  mainSearch(req, res, next) {
    res.locals.search = func.prepSearch(req.query.mainsearch);
    console.log(req.session)
    // vector.fullSearch(req.session.user[0].language, res.locals.search)
    vector.fullSearch('english', res.locals.search)
      .then((data) => {
        res.locals.searchdata = data;
        console.log(data)
        next();
      })
      .catch((err) => {
        next(err);
      })
  },

  dataInitialize(req, res, next) {
    if(res.locals.searchdata) {
      next()
    } else {
      res.locals.searchdata = [{}];
      next()
    }
  },
}


















