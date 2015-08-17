
// store google place objects
var places = {}

$(document).on("ready", function(){
  console.log("click sanity")
    var scrapeMap = new google.maps.Map(document.getElementById('scraper-map'), {
      center: {lat:39.393981, lng:-106.016311},
      zoom: 7
    });

    var input = document.getElementById('scraper-input');

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', scrapeMap);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      map: scrapeMap
    });

    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }
      if (place.geometry.viewport) {
        scrapeMap.fitBounds(place.geometry.viewport);
      } else {
        scrapeMap.setCenter(place.geometry.location);
        scrapeMap.setZoom(17);
      }

      // Set the position of the marker using the place ID and location.
      marker.setPlace({
        placeId: place.place_id,
        location: place.geometry.location
      });
      marker.setVisible(true);

      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          'Place ID: ' + place.place_id + '<br>' +
          place.formatted_address);
      infowindow.open(scrapeMap, marker);


      // add places to object for use in beer maps
      places[place.name] = {"name":place.name, "placeId": place.place_id}
      console.log(places);

    });
  });
