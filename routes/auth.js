var express = require('express');
var router = express.Router();

module.exports = function(passport, User) {
  // GET /auth/instagram
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Instagram authentication will involve
  //   redirecting the user to instagram.com.  After authorization, Instagram
  //   will redirect the user back to this application at /auth/instagram/callback
  router.get('/instagram',
    passport.authenticate('instagram'),
    function(req, res){
      // The request will be redirected to Instagram for authentication, so this
      // function will not be called.
  });

  // GET /auth/instagram/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  router.get('/instagram/callback', 
    passport.authenticate('instagram',
    { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
  });

  // /auth/login for Local user authentication and storage
  router.post('/register', function(req, res, next) {
    User.register(new User({ username : req.body.username, password: req.body.password }), req.body.password, function(err, user) {
      if (err) {
        return res.render('register', { error : err.message });
      }

      passport.authenticate('local')(req, res, function () {
        req.session.save(function (err) {
          if (err) {  return next(err);  }

          res.redirect('/');
        });
      });
    });
  });

  router.post('/login', function(req, res, next ){
      passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) { return res.render('login', { message: info.message }) }
        res.redirect('/');
      })(req, res, next);
  });



  // router.post('/login', 
  //   passport.authenticate('local', { successRedirect: '/',
  //                                   failureRedirect: '/login',
  //                                   message: info.message})

  //   // res.redirect('/');
  // );

  return router;
};
