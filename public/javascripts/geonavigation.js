$( document ).ready(function(){

  // Google map
  var map;

  $.ajax({
    url: '/api/v1/users/getLocation',
    type: 'POST',
    data: { 
      lng: -0.076296,
      lat: 51.523853
    }
  })
  .done(function(data) {
    data.forEach(function(location) {

      var marker = new google.maps.Marker({
        position: {lat: location.geo[1], lng: location.geo[0]},
        map: map
      });
      attachMarkerMessage(marker, location.name);

      console.log(location);
      var content = $(`<a href="">${location.name}</a>`)
      var div = $('<div>').append(content)
      var li = $('<li>').append(div)

      $('.places-ul').append(li)
    })
  })

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 51.523853, lng: -0.076296},
      zoom: 14
    });

    var marker = new google.maps.Marker({
      position: {lat: 51.523853, lng: -0.076296},
      map: map
    });
  }
  initMap();



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