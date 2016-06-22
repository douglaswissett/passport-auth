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
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'username' :  username }, function(err, user) {
          // if there are any errors, return the error
          if (err) {
            return done(err);
          }
          // check to see if theres already a user with that email
          if (user) {
            return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
          } else {
            // if there is no user with that email
            // create the user
            var user = new User();
            user.username = username;
            user.password = user.generateHash(password);
            user.save(function(err) {
              if (err) {
                throw err;
              }
              return done(null, user);
            });
          }
      });
    });
  }));
};


