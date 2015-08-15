$(document).on("ready", function(){

  var hasKannah = []
  var adminMap;


  // ----- Admin Locations Map -------- //

  $("#admin").on("click", function(e){
    e.preventDefault();
    $(".admin-toggle").show();

    // create map
    var adminMap = new google.maps.Map(document.getElementById('admin-map'), {
      center: {lat:39.393981, lng:-106.016311},
      zoom: 7
    });
    // grap form input
    var input = document.getElementById('admin-input');
    // intitalize autocomplete on form intput
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', adminMap);
    // instantiate info window
    var infowindow = new google.maps.InfoWindow();
    // instantiate new marker specific to admin map
    var marker = new google.maps.Marker({
      map: adminMap
    });
    // create scoped place variable
    var place;

    // listen for change in form input, assign value to place variable
    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      place = autocomplete.getPlace();
    });

    // listen for user clicking button or hitting enter on keyboard
    $(".admin-toggle form").on("submit", function(e){
      e.preventDefault();

      // check to see if place object has a location
      if (!place.geometry) {
        return;
      }
      // check to see is that location is inside the current map view
      if (place.geometry.viewport) {
        adminMap.fitBounds(place.geometry.viewport);
      // if not move the map view and make the place the center
      } else {
        adminMap.setCenter(place.geometry.location);
        adminMap.setZoom(17);
      }

      // Set the position of the marker using the place ID and location.
      marker.setPlace({
        placeId: place.place_id,
        location: place.geometry.location
      });

      //make marker visible on map
      marker.setVisible(true);

      // fill in info window
      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          'Place ID: ' + place.place_id + '<br>' +
          place.formatted_address);

      // display info window
      infowindow.open(adminMap, marker);


      // add places to object for use in beer maps
      hasKannah.push({"name":place.name, "placeId": place.place_id})


    });

    // set view poert to admin map
    window.location.hash = "admin-input";
  });


  // *** locations object for testing  *** //
  // var hasKannah = {
  //     "Kannah Creek Brewing Company": {
  //       name: "Kannah Creek",
  //       placeId: "ChIJ81qEAEwcR4cRe2NQBSo1Vww"
  //     },
  //     "Lala's Wine Bar": {
  //       name: "Lala's Wine Bar",
  //       placeId: "ChIJjf6Sudl-bIcR3Uj_41fgHiY"
  //     },
  //     "Capitol Heights Pharmacy & Liquor": {
  //       name: "Capitol Heights Pharmacy & Liquor",
  //       placeId: "ChIJ6cmKPa9-bIcRmW5U1Hr0fOc"
  //     }
  // }



  // -----apply placesID's to map -------- //



  $("#find-beer").on("click", function(){
    $(".find-beer-toggle").show();
    console.log(hasKannah);

    var infowindow = new google.maps.InfoWindow();
    var initialCenter = new google.maps.LatLng(39.393981, -106.016311);
    var map;
    var myOptions =
      {
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: initialCenter
      }

    map = new google.maps.Map(document.getElementById("map"), myOptions);
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


    populateMap(hasKannah)
    window.location.hash = "find-beer-input";
    // window.location.hash = "";

  // -------- move map and zoom with zip code input -------- //
    var geocoder;

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

    $("form").on("submit", function(e){
      e.preventDefault();
      codeAddress();
    });



  // closes event hanlder
  });
// closes document on ready
});

