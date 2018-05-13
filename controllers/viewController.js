module.exports = {
  tester(req, res, next) {
    console.log(req.body)
    res.send('all good')
  },

  show404(error, req, res, next) {
    console.log('show404 was triggered');
    console.log('this is the status code',req.statusCode)
  },

  badPassword(error, req, res, next) {
    console.log(res.locals.username)
    res.render('auth/login.ejs', {
      mode: 'badpass',
      username: res.locals.username
    })
  },

  showLoginForm(req, res, next) {
    res.render('auth/login.ejs');
  },

  showRegisterForm(req, res ,next) {
    res.render('auth/register.ejs', {
      programs: res.locals.programs
    })
  },

  showMain(req, res, next) {
    res.render('main/mainView.ejs', {
      searchdata: res.locals.searchdata,
      searchstring: res.locals.searchstring,
      searchid: res.locals.searchid,
      mode: res.locals.mode,
      resources: res.locals.resources,
      usertype: res.locals.usertype
    })
  },

  showOnePost(req, res, next) {
    res.render('post/postView.ejs', {
      post: res.locals.post,
      comments: res.locals.comments,
      authorid: res.locals.authorid,
      usertype: res.locals.usertype,
    })
  },

  showTextEditor(req, res, next) {
    res.render('post/textEditor.ejs', {
      mode: res.locals.mode,
      postid: res.locals.postid,
      post: res.locals.post
    })
  },

  showUserDetailsEdit(req, res, next) {
    res.render('main/profileedit.ejs', {
      userdetails: res.locals.userdetails
    })
  },

  showUserProfile(req, res, next) {
    res.render('main/showprofile.ejs', {
      userdetails: res.locals.userdetails,
      posts: res.locals.posts,
      usertype: res.locals.usertype,
      authorid: res.locals.authorid
    })
  },

  handleVoteSend(req, res, next) {
    res.json(res.locals.votesum)
  },

  handleNewPost(req, res, next) {
    res.redirect('/main/post/' + res.locals.postid)
  },

  handleCohortSend(req, res, next) {
    res.json(res.locals.allcohorts)
  },

  handleTagSend(req, res, next) {
    res.json(res.locals.alltags)
  },

  handlePostSend(req, res, next) {
    res.json(res.locals.post)
  },

  handleMessageSend(req, res, next) {
    console.log(res.locals.messages)
    res.json(res.locals.messages)
  },

  handleProfileUpdate(req, res, next) {
    res.redirect('/profile/' + res.locals.username)
  },

  sendBackToMain(req, res, next) {
    res.redirect('/main')
  },

  handleProfileButton(req, res, next) {
    res.redirect('/profile/' + res.locals.username)
  },

  handleNewResource(req, res, next) {
    res.redirect('/main/resources')
  },

  handleUserCheckSend(req, res, next) {
    res.json(res.locals.usercheck);
  }

}













