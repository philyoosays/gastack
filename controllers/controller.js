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
    res.locals.searchstring = req.query.mainsearch;
    res.locals.search = func.prepSearch(req.query.mainsearch);
    vector.fullSearch(req.session.user[0].language, res.locals.search)
      .then((data) => {
        res.locals.searchdata = data;
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

  getAllTags(req, res, next) {
    res.locals.searchstring = req.params.tag;
    model.findAllTags(func.concatWildcard(req.params.tag))
      .then((data) => {
        res.locals.searchdata = data;
        next();
      })
      .catch((err) => {
        next(err);
      })
  },

  getAllAuthor(req, res, next) {

  },

  searchFailOverLookStart(req, res, next) {
    if(res.locals.searchdata.length !== 0) {
      next();
    } else {
      console.log('here')
      vector.fullSearch(req.session.user[0].language, func.prepLookStart(res.locals.search))
        .then((data) => {
          console.log(data)
          res.locals.searchdata = data;
          next();
        })
        .catch((err) => {
          next(err);
        })
    }
  },

}


















