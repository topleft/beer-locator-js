$(document).on("ready", function(){

  var hasKannah = []
  var adminMap;

  // get better kannah logo
  // header footer bars
  // refactor into utility and app


  // ----- Admin Locations Map -------- //

  $("#admin").on("click", function(e){
    e.preventDefault();

    $(".admin-toggle").show();
    $(".find-beer-toggle").hide();


    // create map and put on DOM
    var adminMap = new google.maps.Map(
      document.getElementById('admin-map'), {
        center: {lat:39.393981, lng:-106.016311},
        zoom: 7
    });

    // grab form input
    var input = document.getElementById('admin-input');

    // intitalize autocomplete on form intput
    // make auto complete return results inside
    // current map view before elsewhere
    var autocomplete = new
      google.maps.places.Autocomplete(input);
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

    // smooth scroll admin map
    $('html, body').animate({
      scrollTop: $('#admin-scroll-point').offset().top
      }, 1500);


    });


  // -----apply placesID's to map -------- //



  $("#find-beer").on("click", function(){

    $(".find-beer-toggle").show();
    $(".admin-toggle").hide();


    var infowindow = new google.maps.InfoWindow();
    var initialCenter = new google.maps.LatLng(39.393981, -106.016311);
    var myOptions =
      {
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: initialCenter
      }

    var map = new google.maps.Map(document.getElementById("map"), myOptions);
    var service = new google.maps.places.PlacesService(map);

    populateMap(hasKannah)


    // --------- smooth croll ------------- //
    $('html, body').animate({
      scrollTop: $('#find-beer-scroll-point').offset().top
      }, 1000);

  // -------- move map and zoom with zip code input -------- //
    var geocoder;

    $("form").on("submit", function(e){
      e.preventDefault();
      codeAddress();
      $("#find-beer-input").val("");

      // grab locations in current view and list them

    });

  });

  // smooth scroll up to top
  $(".icon").on("click", function(){
    $('html, body').animate({
      scrollTop: $('#top').offset().top
      }, 1000);
    });


// closes document on ready
});

