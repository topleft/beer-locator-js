$(document).on("ready", function(){
  console.log("app.js sanity");

  var map;
  var initialCenter = new google.maps.LatLng(39.393981, -106.016311);
  var myOptions =
    {
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: initialCenter
    }

  map = new google.maps.Map(document.getElementById("map"), myOptions);

  // ----- Locations -------- //


// Kannah Creek Brewing Company, Place ID: ChIJ81qEAEwcR4cRe2NQBSo1Vww
// Edgewater Brewery, Place ID: ChIJI4bjvHAcR4cRNOwP0kGsGeU
  var hasKannahArray = ["ChIJI4bjvHAcR4cRNOwP0kGsGeU","ChIJ81qEAEwcR4cRe2NQBSo1Vww"]
  var hasKannahObject = {};

  // -----apply placesID's to map -------- //
  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);


  function createMarker(place, map){
    var marker = new google.maps.Marker({
      "map": map,
      position: place.geometry.location
    });
    return marker;

  }

  function populateMap(arr) {
    for (var i = 0; i < arr.length; i++) {
      service.getDetails({placeId: arr[i]}, function(place, status) {
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

  populateMap(hasKannahArray)


  var geocoder;

  function codeAddress() {
    geocoder = new google.maps.Geocoder();
    var address = document.getElementById("pac-input").value;
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

  $("form").on("submit", function(e){
    e.preventDefault();
    codeAddress();
  });






});