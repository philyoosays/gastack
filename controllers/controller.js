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
        console.log('ERRRRRRRORRRRRRRRRR getallprograms')
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
        console.log('ERRRRRRRORRRRRRRRRR getoneuser')
        next(err);
      })
  },

  mainSearch(req, res, next) {
    if(req.query.mainsearch === '') {
      next()
    } else {
      res.locals.searchstring = req.query.mainsearch;
      res.locals.search = func.prepSearch(req.query.mainsearch);
      vector.fullSearch(req.session.user[0].language, res.locals.search)
        .then((data) => {
          res.locals.searchdata = data;
          console.log(req.session.user[0])
          next();
        })
        .catch((err) => {
          console.log('ERRRRRRRORRRRRRRRRR mainsearch')
          next(err);
        })
    }
  },

  dataInitialize(req, res, next) {
    res.locals.searchid = {};
    if(Object.keys(res.locals).indexOf('searchdata') !== -1) {
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
        console.log('ERRRRRRRORRRRRRRRRR getalltags')
        next(err);
      })
  },

  getOnePost(req, res, next) {
    console.log('here')
    model.getOnePost(req.params.postid)
      .then((data) => {
        res.locals.post = data;
        next()
      })
      .catch((err) => {
        next(err)
      })
  },

  // getAllAuthor(req, res, next) {

  // },

  searchFailOverLookStart(req, res, next) {
    if(req.query.mainsearch === '') {
      next()
    } else if(res.locals.searchdata.length !== 0) {
      next();
    } else {
      vector.fullSearch(req.session.user[0].language, func.prepLookStart(res.locals.search))
        .then((data) => {
          res.locals.searchdata = data;
          next();
        })
        .catch((err) => {
          console.log('ERRRRRRRORRRRRRRRRR searchfailoverstart')
          next(err);
        })
    }
  },

  saveSearch(req, res, next) {
    if(req.query.mainsearch === ''){
      next();
    } else {
      let searchParams = {
      userid: req.session.user[0].id,
      language: req.session.user[0].language,
      search: req.query.mainsearch,
      resultpost: 0
      }
      model.saveSearch(searchParams)
        .then((data) => {
          res.locals.searchid = data;
          next();
        })
        .catch((err) => {
          next(err);
        })
    }
  },

  updateSavedSearch(req, res, next) {
    let theData = {
      searchid: parseInt(req.query.s),
      postid: parseInt(req.params.postid)
    }
    model.updateSearch(theData)
      .then((data) => {
        next();
      })
      .catch((err) => {
        next(err);
      })
  },

  makeNewPost(req, res, next) {
    console.log(req.body)
    res.send('all good')
  }

}


















