module.exports = {
  tester(req, res, next) {
    res.send('all good')
  },

  show404(req, res, next) {
    console.log('show404 was triggered');
    res.send(404);
  },

  showLoginForm(req, res, next) {
    res.render('auth/login.ejs');
  },

  showRegisterForm(req, res ,next) {
    res.render('auth/register.ejs', {
      programs: res.locals.programs
    })
  },

  showProfile(req, res, next) {
    res.render('profile/profileEdit.ejs', {
      user: res.locals.user
    })
  },

  showMain(req, res, next) {
    res.render('main/mainView.ejs', {
      searchdata: res.locals.searchdata,
      searchstring: res.locals.searchstring
    })
  },

  showNewPost(req, res, next) {
    res.render('post/postNew.ejs')
  }

}
