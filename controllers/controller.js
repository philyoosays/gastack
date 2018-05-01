require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const model = require('../models/models');
const vector = require('../models/vectorModels')
const func = require('../functions/helperFunctions');

const app = express();

module.exports = {

  /////////////////////////////////////////
  /////////////////////////////////////////
  // GET ALL THE THINGS ///////////////////
  /////////////////////////////////////////
  /////////////////////////////////////////

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

  getAllComments(req, res, next) {
    model.findAllComments(parseInt(req.params.postid))
      .then((data) => {
        res.locals.comments = data;
        next();
      })
      .catch((err => {
        next(err);
      }))
  },

  /////////////////////////////////////////
  /////////////////////////////////////////
  // GET ONE //////////////////////////////
  /////////////////////////////////////////
  /////////////////////////////////////////

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

  getOnePost(req, res, next) {
    model.getOnePost(parseInt(req.params.postid))
      .then((data) => {
        res.locals.post = data;
        next();
      })
      .catch((err) => {
        next(err);
      })
  },

  /////////////////////////////////////////
  /////////////////////////////////////////
  // SAVE SOMETHING ///////////////////////
  /////////////////////////////////////////
  /////////////////////////////////////////

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
    if(!req.query.s) {
      next();
    } else {
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
    }
  },

  /////////////////////////////////////////
  /////////////////////////////////////////
  // MAKE SOMETHING ///////////////////////
  /////////////////////////////////////////
  /////////////////////////////////////////

  makeNewPost(req, res, next) {
    let html = func.trimHTML(req.body.submitformhtml);
    let theData = {
      userid: parseInt(req.session.user[0].id),
      post_title: req.body.title,
      post: req.body.submitformtext,
      posthtml: html,
      tags: '',
    }
    model.makeOnePost(theData)
      .then((data) => {
        res.locals.postid = data.id;
        next();
      })
      .catch((err) => {
        next(err);
      })
  },

  makeNewComment(req, res, next) {
    console.log(req.body.submitformhtml)
    let html = func.trimHTML(req.body.submitformhtml);
    let theData = {
      userid: parseInt(req.session.user[0].id),
      postid: parseInt(req.params.postid),
      comment: req.body.submitformtext,
      commenthtml: html,
    }
    res.locals.postid = req.params.postid
    model.makeOneComment(theData)
      .then((data) => {
        next();
      })
      .catch((err) => {
        next(err);
      })
  },

  /////////////////////////////////////////
  /////////////////////////////////////////
  // DO SOMETHING /////////////////////////
  /////////////////////////////////////////
  /////////////////////////////////////////

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

  handleVote(req, res, next) {
    console.log(req.query)
    next()
  },

  /////////////////////////////////////////
  /////////////////////////////////////////
  // UTILITY //////////////////////////////
  /////////////////////////////////////////
  /////////////////////////////////////////

  storeBody(req, res, next) {
    res.locals.body = req.body;
    next();
  },

  dataInitialize(req, res, next) {
    res.locals.searchid = {};
    res.locals.post = {};
    if(Object.keys(res.locals).indexOf('searchdata') !== -1) {
      next()
    } else {
      res.locals.searchdata = [{}];

      next()
    }
  },

  getPostId(req, res, next) {
    res.locals.postid = req.params.postid
    next();
  },

  printData(req, res, next) {
    console.log('This is req.query ', parseInt(req.query.v));
    next();
  },

  /////////////////////////////////////////
  /////////////////////////////////////////
  // LABELS ///////////////////////////////
  /////////////////////////////////////////
  /////////////////////////////////////////

  modeNewPost(req, res, next) {
    res.locals.mode = 'newpost';
    next();
  },

  modeNewComment(req, res, next) {
    res.locals.mode = 'newcomment';
    next();
  },

  modeEditPost(req, res, next) {
    res.locals.mode = 'editpost';
    next();
  },

  userTag(req, res, next) {
    res.locals.authorid = req.session.user[0].id
    next();
  },

}


















