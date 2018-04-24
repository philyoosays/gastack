const authRouter = require('express').Router();
const AuthService = require('./authService');
const ViewController = require('../UserViewController');
const UserController = require('../UserController');

authRouter.route('/login')
  .get(ViewController.showLoginForm)
  .post(AuthService.login, ViewController.handleCreateUser);

authRouter.route('/register')


authRouter.get('/logout', AuthService.logout, ViewController.handleLogout);

/* Error handler */
authRouter.use((err, req, res, next) => {
  console.error(err);
  res.json({ error: err });
});

module.exports = authRouter;
