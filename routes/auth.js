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

  router.post('/register', passport.authenticate('local', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/register', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));


  router.post('/login', passport.authenticate('local-login', {
      successRedirect : '/', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  return router;
};
