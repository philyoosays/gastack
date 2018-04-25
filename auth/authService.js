const bcrypt = require('bcrypt');
const model = require('../models/models');

module.exports = {
   async login (req, res, next) {
    try {
      const { username, password } = req.body;
      console.log(`username: ${username} and pass: ${password}`)
      const user = await model.findOneUser(username);
      console.log(user)
      const isValidPass = await bcrypt.compare(password, user[0].password_digest);
      if (!isValidPass) {
        throw { message: 'bad password'}
      }
      req.session.user = user;
      res.json(req.session.user);
    } catch (err) {
      next(err);
    }
  },

  logout(req, res, next) {

  },

  loginRequired: [
    /* this is either going to resolve to next(false) or next(null) */
    (req, res, next) => next(!req.session.user || null),
    (err, req, res, next) => res.sendStatus(401),
  ],
};
