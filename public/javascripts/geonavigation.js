$( document ).ready(function(){

  // Google map
  // var map;
  // function initMap() {
  //   map = new google.maps.Map(document.getElementById('map'), {
  //     center: {lat: position.coords.latitude, lng: position.coords.longitude},
  //     zoom: 14
  //   });
  // }
  // initMap();
  // var marker = new google.maps.Marker({
  //   position: {lat: position.coords.latitude, lng: position.coords.longitude},
  //   map: map
  // });


function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 6
    });
    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
initMap();


  // function geo_success(position) {

  // $.ajax({
  //   url: '/api/v1/users/getLocation',
  //   type: 'POST',
  //   data: { 
  //     lng: position.coords.longitude,
  //     lat: position.coords.latitude
  //   }
  // })
  // .done(function(data) {
  //   data.forEach(function(location) {

  //     var marker = new google.maps.Marker({
  //       position: {lat: location.geo[1], lng: location.geo[0]},
  //       map: map
  //     });
  //     attachMarkerMessage(marker, location.name);

  //     console.log(location);
  //     var content = $(`<a href="">${location.name}</a>`)
  //     var div = $('<div>').append(content)
  //     var li = $('<li>').append(div)

  //     $('.places-ul').append(li)
  //   })
  // })


  // }

  // Attaches an info window to a marker with the provided message. When the
  // marker is clicked, the info window will open with the secret message.
  function attachMarkerMessage(marker, placeName) {
    var infowindow = new google.maps.InfoWindow({
      content: placeName
    });

    marker.addListener('click', function() {
      infowindow.open(marker.get('map'), marker);
    });

  }

  // function geo_error() {
  //   alert("Sorry, no position available.");
  // }

  // var geo_options = {
  //   enableHighAccuracy: true, 
  //   maximumAge        : 30000, 
  //   timeout           : 27000
  // };

  // navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);

});
