var InstagramStrategy = require('passport-instagram').Strategy;
var User = require('../models/user');

module.exports = function(passport) {
  passport.use(new InstagramStrategy({
      clientID: process.env.IG_ID,
      clientSecret: process.env.IG_SECRET,
      callbackURL: "http://localhost:3000/auth/instagram/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        User.count({instagram_id: profile.id}, function (err, count){ 
          if (err) throw err;

          if(count>0){
            //document exists });
            return done(null, profile);
          }
          // create new user record
          var user = new User({
            username: profile.username,
            instagram_id: profile.id
          });
          // save user record to MongoDB
          user.save(function(err) {
            if (err) throw err;
          });
        });

        // To keep the example simple, the user's Instagram profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Instagram account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  ));
};