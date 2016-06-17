$( document ).ready(function(){

  // Google map
  var map;

  function geo_success(position) {
    console.log( position.coords);

    $.ajax({
      url: '/api/v1/users/getLocation',
      type: 'POST',
      data: { 
        lng: position.coords.longitude,
        lat: position.coords.latitude
      }
    })
    .done(function(data) {

      data.forEach(function(location) {

        var marker = new google.maps.Marker({
          position: {lat: location.geo[1], lng: location.geo[0]},
          map: map
        });

      })
    })

    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: position.coords.latitude, lng: position.coords.longitude},
        zoom: 8
      });
    }
    initMap();

    var marker = new google.maps.Marker({
      position: {lat: position.coords.latitude, lng: position.coords.longitude},
      map: map
    });

  }

  function geo_error() {
    alert("Sorry, no position available.");
  }

  var geo_options = {
    enableHighAccuracy: true, 
    maximumAge        : 30000, 
    timeout           : 27000
  };

  navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
});
