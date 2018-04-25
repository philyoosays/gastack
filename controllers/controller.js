require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const model = require('../models/models');
const func = require('../functions/helperFunctions');

const app = express();
module.exports = {
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
    const { username } = req.body;
    model.findOneUser(username)
      .then( (data) => {
        console.log(data);
        console.log('req.body ', req.body)
        res.locals.user = data;
        next();
      })
      .catch( (err) => {
        next(err);
      })
  },

  checkPasswordTypo(req, res, next) {
    if(req.body.password === req.body.passwordCheck) {
      next();
    } else {
      res.send('Passwords do not match');
    }
  },

  doesUserExist(req, res, next) {
    if(res.locals.user.length === 0) {
        next();
    } else {
      res.send('User already exists')
    }
  },

  async generatePassword(req, res, next) {
    const { password } = req.body;
    await bcrypt.hash(password, 11)
      .then( (hash) => {
        res.locals.user = req.body;
        console.log('genpass: ', res.locals.user)
        res.locals.user.password_digest = hash;
        next();
      })
      .catch( (err) => {
        next(err);
      })
  },

  registerUser(req, res, next) {
    model.addUser(res.locals.user)
      .then( (data) => {
        res.json(data);
      })
  },

}
