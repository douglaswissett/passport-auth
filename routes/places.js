var express = require('express');
var router = express.Router();
var request = require('request');

var location = {
  lat: 52.5200,
  long: 13.4050
}

router.get('/', function(req, res, next) {

  request(`https://api.foursquare.com/v2/venues/explore?client_id=${process.env.FS_ID}
    &client_secret=${process.env.FS_SECRET}
    &v=20130815&ll=${location.lat},${location.long}`,
    function (error, response, body) {
      var parsed = JSON.parse(body);

      parsed.response.groups[0].items.forEach(function(item) {
        console.log(item.venue.categories[0].name);
      });
      res.render('show.jade', {
        title: 'Places',
        current_location: parsed.response.headerFullLocation,
        description :'Using Foursquare Venue / Explore API',
        response: parsed.response.groups[0].items
      });
  });
});

router.get('/json', function(req, res, next) {
  request(`https://api.foursquare.com/v2/venues/explore?client_id=${process.env.FS_ID}
    &client_secret=${process.env.FS_SECRET}
    &v=20130815&ll=${location.lat},${location.long}`,
    function (error, response, body) {
      res.send(JSON.parse(body));
  });
})

module.exports = router;