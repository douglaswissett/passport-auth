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
        console.log('locations: ', locations);
        res.render('show_map.jade',{ data: locations, center: { lat: user.coordinates[1] , lng: user.coordinates[0] } });
      });
    })
  });

  router.post('/getLocation', function(req, res) {

    // Update Users Location
    User.update({username: req.user.username},{
      coordinates: [req.body.lng, req.body.lat]
    }, function(err) {
      console.log(err);
    });


    // convert dump data into geoindexable data
    Db_dump.find({},function(err, venues){
      venues.forEach(function(venue) {
        // Save location data
        var locationModel     = new LocationSchema(); 
        locationModel.name = venue.name;
        locationModel.location = venue.location;
        locationModel.city = venue.city;
        locationModel.geo    = [venue.longitude, venue.latitude];
        locationModel.latitude = venue.latitude;
        locationModel.longitude = venue.longitude;
        locationModel.related_ids = venue.related_ids;
        locationModel.description = venue.description;
        locationModel.meta_tags = venue.meta_tags;
        locationModel.photo_link = venue.photo_link;
        locationModel.save();
      });
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

  return router;
};
