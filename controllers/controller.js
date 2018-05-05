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
    console.log('this is all programs')
    model.findAllPrograms()
      .then( (data) => {
        console.log('this is ', data)
        res.locals.programs = data;
        next();
      })
      .catch( (err) => {
        next(err);
      })
  },

  getAllCohorts(req, res, next) {
    model.findAllCohorts(parseInt(req.body.programid))
      .then((data) => {
        res.locals.allcohorts = data;
        next();
      })
      .catch((err) => {
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
        next(err);
      })
  },

  getAllComments(req, res, next) {
    let theData = {
      postid: parseInt(req.params.postid),
      userid: req.session.user[0].id
    }
    model.findAllComments(theData)
      .then((data) => {
        res.locals.comments = func.killNullInVotes(data)
        next();
      })
      .catch((err => {
        next(err);
      }))
  },

  getTagsFullList(req, res, next) {
    model.listAllTags()
      .then( data => {
        res.locals.alltags = data;
        next();
      })
      .catch( err => {
        next(err);
      })
  },

  getAllResources(req, res, next) {
    model.findAllResources()
      .then(data => {
        res.locals.resources = data;
        next();
      })
      .catch(err => {
        net(err);
      })
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

  getOneComment(req, res, next) {
    model.getOneComment(parseInt(res.locals.postid))
      .then((data) => {
        res.locals.post = data;
        console.log(res.locals.post)
        next();
      })
      .catch((err) => {
        next(err);
      })
  },

  getOneVote(req, res, next) {
    let theData = {
      userid: req.session.user[0].id,
      commentid: parseInt(req.body.commentID)
    }
    model.findOneVote(theData)
      .then((data) => {
        console.log('this is the one vote', data)
        res.locals.theOneVote = data;
        next();
      })
      .catch((err) => {
        next(err);
      })
  },

  getVoteSum(req, res, next) {
    let theData = {
      commentid: parseInt(req.body.commentID),
      postid: parseInt(req.body.postID)
    }
    model.findVoteSum(theData)
      .then((data) => {
        res.locals.votesum = data;
        next();
      })
      .catch((err) => {
        next(err);
      })
  },

  getUserDetails(req, res, next) {
    let user = req.session.user[0];
    res.locals.userdetails = {
      fname:      user.fname,
      lname:      user.lname,
      email:      user.email,
      programid:  user.programid,
      blurb:      user.blurb,
      location:   user.location,
      website:    user.website,
      github:     user.github,
      cohortid:   user.cohortid
    }
    next();
  },

  getUserProgramCohort(req, res, next) {
    model.findUserProgramCohort(res.locals.userdetails.programid, res.locals.userdetails.cohortid)
      .then(data => {
        console.log(data)
        res.locals.userdetails.program = data.program;
        res.locals.userdetails.cohort = data.cohort;
        next();
      })
      .catch(err => {
        next(err);
      })
  },

  /////////////////////////////////////////
  /////////////////////////////////////////
  // SAVE/EDIT SOMETHING //////////////////
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

  updatePost(req, res, next) {
    if(!req.body.isdeleted) {
      res.locals.isdeleted = false;
    } else {
      res.locals.isdeleted = req.body.isdeleted;
    }
    let theData = {
      id: parseInt(res.locals.postid),
      title: req.body.title,
      post: req.body.submitformtext,
      posthtml: req.body.submitformhtml,
      tags: req.body.tags,
      isdeleted: res.locals.isdeleted
    }
    model.editOnePost(theData)
      .then((data) => {
        next()
      })
      .catch((err) => {
        next(err)
      })
  },

  updateComment(req, res, next) {
    let theData = {
      id: parseInt(res.locals.postid),
      comment: req.body.submitformtext,
      commenthtml: req.body.submitformhtml
    }
    model.editOneComment(theData)
      .then((data) => {
        console.log(data)
        res.locals.postid = data.postid;
        next();
      })
      .catch((err) => {
        next(err);
      })
  },

  saveEditVote(req, res, next) {
    let theData = {
      userid: req.session.user[0].id,
      commentid: parseInt(req.body.commentID),
      postid: parseInt(req.body.postID),
      vote: parseInt(req.body.vote),
    }
    if(res.locals.theOneVote.length === 0) {
      model.addNewVote(theData)
        .then((data) => {
          next();
        })
        .catch((err) => {
          next(err);
        })
    } else {
      model.updateVote(theData)
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
      tags: req.body.tags,
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
    res.locals.mode = '';
    res.locals.resources = [];
    res.locals.searchdata = [{}];
    res.locals.searchstring = '';
    next();
  },

  getPostId(req, res, next) {
    res.locals.postid = req.params.postid
    next();
  },

  getCommentId(req, res, next) {
    res.locals.postid = req.params.commentid;
    next();
  },

  printData(req, res, next) {
    func.matchVotesToComments(res.locals.comments, res.locals.votes)
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

  modeEditComment(req, res, next) {
    res.locals.mode = 'editcomment';
    next();
  },

  modeAllResources(req, res, next) {
    res.locals.mode = 'allresources';
    next();
  },

  userTag(req, res, next) {
    res.locals.authorid = req.session.user[0].id
    next();
  },

  userType(req, res, next) {
    res.locals.usertype = req.session.user[0].account_type;
    next();
  }

}


















