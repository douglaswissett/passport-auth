var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {
  // Passport-Local

  // passport.use(new LocalStrategy(User.authenticate()));

  passport.use('local', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    process.nextTick(function() {

    });
  }));
};


