$( document ).ready(function(){
  console.log('GeoNaviation loaded');

  function geo_success(position) {
    console.log( position.coords);

    $.ajax({
      url: '/api/v1/users/getLocation',
      type: 'POST',
      data: { 
        lng: position.coords.longitude,
        lat: position.coords.latitude
      },
      success: function() {
        console.log('AJAX GeoNaviation');
      }
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
