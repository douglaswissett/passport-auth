var instagram = require('./instagram');
var local = require('./local');
var User = require('../models/user');

module.exports = function(passport){

  passport.serializeUser(function(user, done) {
    console.log('serializing user: ');console.log(user);
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    console.log('deserializing user:',user);
    done(null, user);
  });

  // Setting up Passport Strategies for Instagram and Local
  instagram(passport);
  local(passport);
}