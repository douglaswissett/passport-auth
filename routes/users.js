var express = require('express');
var router = express.Router();
var Db_dump = require('../models/db_dump');

module.exports = function(User, LocationSchema) {
  /* GET users listing. */
  router.get('/', function(req, res) {
    User.findAll(function(err, users){
      res.render('show_users.jade', { data: users, title: 'Users', description: 'kompas_test userbase' });
    });
  });

  router.get('/json', function(req, res) {
    User.findAll(function(err, users) {
      res.json(users);
    });
  });

  router.get('/places', function(req, res) {
    
    User.findOne({ 'username': req.user.username }, function (err, user) {
      if (err) throw err;
      LocationSchema.find({'geo': {$near: [ user.coordinates[0] , user.coordinates[1] ], $maxDistance: 1000/6371}}, 
      function(err, locations) {
        res.render('show_map.jade',{ data: locations, center: { lat: user.coordinates[1] , lng: user.coordinates[0] } });
      });
    })
  });

  router.post('/getLocation', function(req, res) {
    // Update Users Location
    User.update({username: req.user.username},{
      coordinates: [req.body.lng, req.body.lat]
    }, function(err) {
      console.error(err);
    });
    // Get location data
    User.findOne({ 'username': req.user.username }, function (err, user) {
      if (err) throw err;
      LocationSchema.find({'geo': {$near: [ user.coordinates[0] , user.coordinates[1] ], $maxDistance: 1000/6371}}, 
      function(err, locations) {
        res.json(locations);
      });
    })
  });

  // convert dump data into geoindexable data
  router.get('/dump', function(req ,res) {
    Db_dump.find({},function(err, places){
      places.forEach(function(place) {
        // Save location data
        var locationModel     = new LocationSchema(); 
        locationModel.name = place.name;
        locationModel.location = place.location;
        locationModel.city = place.city;
        locationModel.geo    = [place.longitude, place.latitude];
        locationModel.latitude = place.latitude;
        locationModel.longitude = place.longitude;
        locationModel.related_ids = place.related_ids;
        locationModel.description = place.description;
        locationModel.meta_tags = place.meta_tags;
        locationModel.photo_link = place.photo_link;
        locationModel.save();
      });
    });
    var html = '<html>Dump data seeded, <a href="/">go back</a></html>'
    res.send(html);
  });

  return router;
};
