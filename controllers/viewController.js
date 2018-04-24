module.exports = {
  show404(req, res, next) {
    console.log('show404 was triggered');
    res.send(404);
  },
  showLoginForm(req, res, next) {
    res.render('auth/login.ejs');
  },
  showRegisterForm(req, res ,next) {
    res.render('auth/register.ejs')
  },
}
