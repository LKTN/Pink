contactsMap = document.querySelector(".contacts__map");

function initMap() {
  var location = {lat: 59.936331, lng: 30.321582};
  var mapOptions = {
    center: new google.maps.LatLng(location),
    zoom: 16,
    disableDefaultUI: true
  };

  var map = new google.maps.Map(contactsMap, mapOptions);

  var markerImage = new google.maps.MarkerImage(
    "img/icon-map-marker.svg",
    new google.maps.Size(36, 36)
  );

  new google.maps.Marker({
    position: location,
    map: map,
    icon: markerImage
  });

  window.onresize = function() {
    map.setCenter(location);
    map.setZoom(16);
  }
}

google.maps.event.addDomListener(window, "load", initMap);
