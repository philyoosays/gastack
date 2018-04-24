// const bcrypt = require('bcrypt');
// const    = require('../model/User');

// module.exports = {
//    async login (req, res, next) {
//     try {
//       const { username, password } = req.body;
//       const user = await User.findOne(username);
//       const isValidPass = await bcrypt.compare(password, user.password_digest);
//       if (!isValidPass) {
//         throw { message: 'bad password'}
//       }
//       req.session.user = user;
//       next();
//     } catch (err) {
//       next(err);
//     }
//   },

//   logout(req, res, next) {

//   },

//   loginRequired: [
//     /* this is either going to resolve to next(false) or next(null) */
//     (req, res, next) => next(!req.session.user || null),
//     (err, req, res, next) => res.sendStatus(401),
//   ],
// };
