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

  router.post('/getLocation', function(req, res) {


    var locationModel     = new LocationSchema(); 
    locationModel.name = 'city name'; 
    locationModel.geo    = [ req.body.lng, req.body.lat ]; 

    locationModel.save(function (err) {
      console.log('saved')
    });

    LocationSchema.find({'geo': {$near: [13.41, 52.481],$maxDistance: 1000/6371}}, console.log);

  });

  return router;
};
