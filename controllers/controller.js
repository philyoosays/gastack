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
        console.log('this is ', data)
        res.locals.programs = data;
        next();
      })
      .catch( (err) => {
        console.log('im here')
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
      userid: func.killArray(req.session.user).id,
      postid: parseInt(req.params.postid),
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
        next(err);
      })
  },

  getAllNewPosts(req, res, next) {
    model.findAllNewPosts()
      .then(data => {
        res.locals.searchdata = data;
        next();
      })
      .catch(err => {
        next(err);
      })
  },

  getAllUserPosts(req, res, next) {
    model.findAllUserPosts(res.locals.username)
      .then(data => {
        res.locals.posts = data;
        next();
      })
      .catch(err => {
        next(err);
      })
  },

  getAllTheMessages(req, res, next) {
    console.log('hit')
    model.getAllMessages()
      .then(data => {
        console.log(data)
        res.locals.messages = data
        next();
      })
      .catch(err => {
        next(err);
      })
  },

  /////////////////////////////////////////
  /////////////////////////////////////////
  // GET ONE //////////////////////////////
  /////////////////////////////////////////
  /////////////////////////////////////////

  getOneUser(req, res, next) {
    model.findOneUser(req.body.username)
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

  getOnePostForPost(req, res, next) {
    model.getOnePost(parseInt(req.body.htmlID))
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
      userid: func.killArray(req.session.user).id,
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

  getOneResource(req, res, next) {
    model.findOneResource(parseInt(req.params.resourceid))
      .then(data => {
        res.locals.post = data;
        next();
      })
      .catch(err => {
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
    let user = res.locals.username;
    model.findOneUser(user)
      .then(data => {
        res.locals.userdetails = func.killArray(data);
        next()
      })
      .catch(err => {
        next(err);
      })
  },

  getUserProgramCohort(req, res, next) {
    model.findUserProgramCohort(res.locals.userdetails.programid, res.locals.userdetails.cohortid)
      .then(data => {
        res.locals.userdetails.program = data.program;
        res.locals.userdetails.cohort = data.cohort;
        next();
      })
      .catch(err => {
        next(err);
      })
  },

  checkUserView(req, res, next) {
    let theData = {
      userid: func.killArray(req.session.user).id,
      postid: req.params.postid
    }
    console.log('checkuserview input', theData)
    model.findUserView(theData)
      .then(data => {
        res.locals.userview = data;
        console.log('userviewsfromdb', res.locals.userview)
        next();
      })
      .catch(err => {
        next(err);
      })
  },

  checkUsername(req, res, next) {
    model.findOneUser(req.body.username)
      .then(data => {
        if(data.length === 0) {
          res.locals.usercheck = '';
          next();
        } else {
          res.locals.usercheck = func.killArray(data).username;
          next();
        }
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
      var searchParams = {
        userid: func.killArray(req.session.user).id,
        language: func.killArray(req.session.user).language,
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
    let theData = {
      id: parseInt(res.locals.postid),
      title: req.body.title,
      post: req.body.submitformtext,
      posthtml: func.trimHTML(req.body.submitformhtml),
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
      commenthtml: req.body.submitformhtml,
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
      commentid: parseInt(req.body.commentID),
      postid: parseInt(req.body.postID),
      vote: parseInt(req.body.vote),
      userid: func.killArray(req.session.user).id,
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

  updateProfile(req, res, next) {
    let theData = req.body;
    theData.userid = func.killArray(req.session.user).id
    console.log('this is thedata ', theData)
    model.editProfile(theData)
      .then(data => {
        res.locals.username = data.username;
        next();
      })
      .catch(err => {
        next(err);
      })
  },

  storeView(req, res, next) {
    if(res.locals.userview.length !== 0) {
      console.log('views exists')
      next();
    } else {
      console.log('no view')
      let theData = {
        postid: parseInt(req.params.postid),
        userid: func.killArray(req.session.user).id,
      }
      model.saveView(theData)
        .then(data => {
          next();
        })
        .catch(err => {
          next(err);
        })
    }
  },

  deletePost(req, res ,next) {
    model.deleteFromPosts(parseInt(req.params.postid))
      .then(data => {
        next();
      })
      .catch(err => {
        next(err);
      })
  },

  updateResource(req, res, next) {
    let theData = {
      id: parseInt(res.locals.postid),
      label: req.body.submitformtext,
      labelhtml: req.body.submitformhtml
    }
    model.editOneResource(theData)
      .then(data => {
        next();
      })
      .catch(err => {
        next(err);
      })
  },

  /////////////////////////////////////////
  /////////////////////////////////////////
  // MAKE SOMETHING ///////////////////////
  /////////////////////////////////////////
  /////////////////////////////////////////

  makeNewPost(req, res, next) {
    let html = func.trimHTML(req.body.submitformhtml);
    let theData = {
      userid: func.killArray(req.session.user).id,
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
      userid: func.killArray(req.session.user).id,
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

  makeNewResource(req, res, next) {
    let html = func.trimHTML(req.body.submitformhtml);
    let theData = {
      userid: func.killArray(req.session.user).id,
      label: req.body.submitformtext,
      labelhtml: html,
    }
    model.createNewResource(theData)
      .then(data => {
        next()
      })
      .catch(err => {
        next(err)
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
      vector.fullSearch(func.killArray(req.session.user).language, res.locals.search)
        .then((data) => {
          res.locals.searchdata = data;
          console.log(req.session.user)
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
      vector.fullSearch(func.killArray(req.session.user).language, func.prepLookStart(res.locals.search))
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

  findResources(req, res, next) {
    if(req.query.mainsearch === '') {
      next()
    } else {
      res.locals.searchstring = req.query.mainsearch;
      res.locals.search = func.prepSearch(req.query.mainsearch);
      vector.findResources(func.killArray(req.session.user).language, res.locals.search)
        .then((data) => {
          res.locals.resources = data;
          console.log('thisis', data)
          next();
        })
        .catch((err) => {
          next(err);
        })
    }
  },

  resourcesFailOverLookStart(req, res, next) {
    if(req.query.mainsearch === '') {
      next()
    } else if(res.locals.resources.length !== 0) {
      next();
    } else {
      vector.findResources(func.killArray(req.session.user).language, func.prepLookStart(res.locals.search))
        .then((data) => {
          res.locals.resources = data;
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
    res.locals.username = '';
    res.locals.usertype = 'student'
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

  getResourceId(req, res, next) {
    res.locals.postid = req.params.resourceid;
    next();
  },

  getUsername(req, res, next) {
    res.locals.username = req.params.username;
    next();
  },

  getOwnUsername(req, res, next) {
    res.locals.username = func.killArray(req.session.user).username
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

  modeNewResource(req, res, next) {
    res.locals.mode = 'newresource';
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

  modeEditResource(req, res, next) {
    res.locals.mode = 'editresource';
    next();
  },

  modeAllResources(req, res, next) {
    res.locals.mode = 'allresources';
    next();
  },

  modeMain(req, res, next) {
    res.locals.mode = 'main';
    next();
  },

  userTag(req, res, next) {
    res.locals.authorid = func.killArray(req.session.user).id
    next();
  },

  userType(req, res, next) {
    console.log(func.killArray(req.session.user))
    res.locals.usertype = (func.killArray(req.session.user).account_type === null) ? 'student' : func.killArray(req.session.user).account_type;
    next();
  }

}


















