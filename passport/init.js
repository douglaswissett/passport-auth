var instagram = require('./instagram');
var Account = require('../models/account');

module.exports = function(passport){

  passport.serializeUser(function(user, done) {
    console.log('serializing user: ');console.log(user);
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    console.log('deserializing user:',user);
    done(null, user);
  });

  // Setting up Passport Strategies for Facebook and Twitter
  instagram(passport);
}