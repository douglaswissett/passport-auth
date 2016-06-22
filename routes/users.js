var express = require('express');
var router = express.Router();
var Db_dump = require('../models/db_dump');

module.exports = function(User, LocationSchema) {
  // display all users
  router.get('/', function(req, res) {
    User.find({}, function(err, users){
      res.render('show_users.jade', { data: users, title: 'Users', user: req.user });
    });
  });
  // send all users in json format
  router.get('/json', function(req, res) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  });
  // render google map
  router.get('/map', function(req, res) {
    res.render('show_map.jade', { user: req.user });
  });
  // Get nearby places from location
  router.post('/getLocation', function(req, res) {
    LocationSchema.getNearbyPlaces([ req.body.lng , req.body.lat ], function(err, locations) {
      if (err) console.error(err.message);
      console.log('TEST LOCATIONS: ', locations );
      res.json(locations);
    });
  });
  // display user profile
  router.get('/:username', function(req, res) {
    User.findOne({ 'username' : req.params.username }, function(err, user){
      if (err) throw err;
      res.render('show_profile.jade', { username: user.username, user: req.user });
    });
  });

  return router;
};
