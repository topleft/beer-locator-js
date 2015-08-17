
  // create a google marker given a placeId and a map
  function createMarker(place, map){
      var marker = new google.maps.Marker({
        "map": map,
        position: place.geometry.location
      });
      return marker;
    }

  // takes an array of objects {name:"Name of location" , placeId:"google placeId number"}
  // not a pure function, uses global variable 'map' and infowindow
  function populateMap(arr) {
    for (var i = 0; i < arr.length; i++) {
      var currentId = arr[i].placeId;
      service.getDetails({placeId: currentId}, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          google.maps.event.addListener(
              createMarker(place, map),
              'click',
                function() {
                  infowindow.setContent(place.name, place.postal_code);
                  infowindow.open(map, this);
                }
          );
        }
      });
    };
  }

  // turns a zip code into a googleId, sets map center and zoom
  // not a pure function, uses global variable 'map'
  function codeAddress() {
    geocoder = new google.maps.Geocoder();
    var address = document.getElementById("find-beer-input").value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        map.setZoom(14);
        }
      else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };