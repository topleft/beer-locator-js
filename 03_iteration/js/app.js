$(document).on("ready", function(){

  var hasKannah = []
  var adminMap;
  var map;

  // clear out entries on submit
  // get better kannah logo
  // header footer bars
  // refactor into utility and app


  // ----- Admin Locations Map -------- //

  $("#admin").on("click", function(e){
    e.preventDefault();
    $(".admin-toggle").show();
    $(".find-beer-toggle").hide();

    $(".close").on("click", function(){
      $(".admin-toggle").hide();
    });

    // create map and put on DOM
    var adminMap = new google.maps.Map(document.getElementById('admin-map'), {
      center: {lat:39.393981, lng:-106.016311},
      zoom: 7
    });

    // grab form input element
    var input = document.getElementById('admin-input');
    console.log(input);
    // intitalize autocomplete on form intput
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', adminMap);

    // instantiate info window
    var infowindow = new google.maps.InfoWindow();

    // instantiate new marker specific to admin map
    var marker = new google.maps.Marker({
      map: adminMap
    });

    // create scoped 'place' variable
    var place;

    // listen for change in form input, assign value to place variable
    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      place = autocomplete.getPlace();
    });

    // listen for user clicking button or hitting enter on keyboard
    $(".admin-toggle form").on("submit", function(e){
      e.preventDefault();
      $("#admin-input").val("");
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

    // smooth scroll
    // $('html, body').animate({
    //   scrollTop: $('#admin-scroll-point').offset().top
    //   }, 1500);
    });


  // -----apply placesID's to map -------- //

  $("#find-beer").on("click", function(){
    $(".find-beer-toggle").show();
    $(".admin-toggle").hide();


    var infowindow = new google.maps.InfoWindow();
    var initialCenter = new google.maps.LatLng(
      39.393981,
      -106.016311);
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

    var arr = hasKannah;

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
    // --------- smooth croll ------------- //
    $('html, body').animate({
      scrollTop: $('#find-beer-scroll-point').offset().top
      }, 1000);
  });






  // -------- move map and zoom with zip code input -------- //

    $(".find-beer-toggle form").on("submit", function(e){
      e.preventDefault();
      var geocoder;

      geocoder = new google.maps.Geocoder();
      var address = document.getElementById("find-beer-input").value;
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          map.setZoom(14);
          }
        else {
          alert("Geocode was not successful for the following reason: " + status + ", inside");
        }
      });


      $("#find-beer-input").val("");

  // closes event hanlder
  });

  // smooth scroll up to top
  $(".icon").on("click", function(){
    $('html, body').animate({
      scrollTop: $('#top').offset().top
      }, 1000);
    });


// closes document on ready
});

