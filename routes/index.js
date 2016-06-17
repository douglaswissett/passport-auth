var express = require('express');
var router = express.Router();
var Db_dump = require('../models/db_dump');

module.exports = function(LocationSchema, ensureAuthenticated) {
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index', { 
      title: 'Express',
      user: req.user
    });
  });

  router.get('/register', function(req, res) {
      res.render('register', { });
  });

  router.get('/login', function(req, res){
    res.render('login', { user: req.user });
  });

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  // convert dump data into geo index data
  router.get('/data/dump', ensureAuthenticated, function(req, res) {
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
}

