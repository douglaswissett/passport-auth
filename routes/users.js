var express = require('express');
var router = express.Router();

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

    // var locationModel     = new LocationSchema(); 
    // locationModel.name = 'city name'; 
    // locationModel.geo    = [ 13.122434, 52.123211 ]; 
    // locationModel.save();
    
    User.findOne({ 'username': req.user.username }, function (err, user) {
      if (err) throw err;

      LocationSchema.find({'geo': {$near: [ user.coordinates[0] , user.coordinates[1] ], $maxDistance: 1000/6371}}, 
      function(err, locations) {
        res.render('locations.jade',{ data: locations });
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
  });

  return router;
};
