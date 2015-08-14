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
  // var hasKannahArray = ["ChIJI4bjvHAcR4cRNOwP0kGsGeU","ChIJ81qEAEwcR4cRe2NQBSo1Vww"]
  var hasKannah = {
      "Kannah Creek Brewing Company": {
        name: "Kannah Creek",
        placeId: "ChIJ81qEAEwcR4cRe2NQBSo1Vww"
      },
      "Lala's Wine Bar": {
        name: "Lala's Wine Bar",
        placeId: "ChIJjf6Sudl-bIcR3Uj_41fgHiY"
      },
      "Capitol Heights Pharmacy & Liquor": {
        name: "Capitol Heights Pharmacy & Liquor",
        placeId: "ChIJ6cmKPa9-bIcRmW5U1Hr0fOc"
      }
  }



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

  // get object from scraper

  function populateMap(obj) {
    var arr = Object.keys(obj);
    for (var i = 0; i < arr.length; i++) {
      //need to create an obj {placeId: id}
      //this is bull shit...idObj[placeId] = obj[keys[i]][placeId];
      var placeIdObject = {"placeId": obj[arr[i]].placeId}
      service.getDetails(placeIdObject, function(place, status) {
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


  populateMap(hasKannah)

  // -------- move map and zoom with zip code input -------- //
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