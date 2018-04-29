module.exports = {
  tester(req, res, next) {
    console.log(res.locals.searchdata)
    res.send('all good')
  },

  show404(error, req, res, next) {
    console.log('show404 was triggered');
    console.log('this is the status code',req.statusCode)
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
      searchstring: res.locals.searchstring,
      searchid: res.locals.searchid
    })
  },

  showOnePost(req, res, next) {
    res.render('post/postView.ejs', {
      post: res.locals.post
    })
  },

  showNewPost(req, res, next) {
    res.render('post/postNew.ejs')
  }

}
