$( document ).ready(function(){

  // Google map
  var map;


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        console.log('show position');
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    console.log(position.coords.latitude, position.coords.longitude);
}
getLocation();

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
  // Attaches an info window to a marker with the provided message. When the
  // marker is clicked, the info window will open with the secret message.
  // function attachMarkerMessage(marker, placeName) {
  //   var infowindow = new google.maps.InfoWindow({
  //     content: placeName
  //   });

  //   marker.addListener('click', function() {
  //     infowindow.open(marker.get('map'), marker);
  //   });

  // }

});
