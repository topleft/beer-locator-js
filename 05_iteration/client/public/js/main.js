// var cred = require("../../server/cred.js");

// replace key with cred file key

  // -- globals -- //
  var locationsShown = false;

$(document).on("ready", function(){
  console.log("hello Pete");

  var adminMap;
  var map;
  var markers = [];
  var adminToggle = true; // true is add, false is update/delete
  $("#add-form").show();

  // ------------------------------------//
  // ----- Handle Toggle Admin -------- //
  // ----------------------------------//

  // data on = add, data off = Update
  $("#admin-toggle").closest("div").on("click", function(){
    var classArr = ($(this).closest("div").attr("class")).split(" ");
    var state = classArr.filter(function(cls){
      return (cls === "off");
    });
    if (state.length === 1){
      adminToggle = true;
      $("#add-form").show();
      $("#update-form").hide();
    }
    else{
      // Update
      adminToggle = false;
      $("#add-form").hide();
      $("#update-form").show()
    }
  })


// replace hasKannah with ajax calls to DB

  // ------------------------------------//
  // ----- Admin Locations to DB ------ //
  // ----------------------------------//

  var adminMap = new google.maps.Map(document.getElementById('admin-map'), {
    center: {lat:39.393981, lng:-106.016311},
    zoom: 7
  });


  // intitalize autocomplete on form intput
    var $placeInput = document.getElementById('admin-place-input');
    var autocomplete = new google.maps.places.Autocomplete($placeInput);
    autocomplete.bindTo('bounds', adminMap);

    var place;
    autocomplete.addListener('place_changed', function() {
      // infowindow.close();
      place = autocomplete.getPlace();
    });

    $("#add-location").on("click", function(e){
      e.preventDefault();
      var $typeInput = $('#admin-type-input');
      var $checkbox = $("#checkbox");

      $.ajax({
        method: "POST",
        url: "/admin",
        data: {
          placeId: place.place_id,
          type: $typeInput.val(),//userinput
          active: $checkbox.val()//user input
        }
      }).done(function(data){
        console.log("Success");
        $typeInput.val("")
        $checkbox.val("")
        // $("#message").html("Success! Location added.") // create div
        console.log(markers);
        addMarker(data.placeId, adminMap, adminToggle, markers);
      }).fail(function(){
        console.log("Fail");
        // show fail message
      });

  //closes out "add" click
    });

    $("#update-location").on("click", function(e){
      e.preventDefault();
    });
    $("#delete-location").on("click", function(e){
      e.preventDefault();
      console.log("delete");
    });

    $("#show-locations").on("click", function(){
      console.log("click: "+ locationsShown)
      showAllLocations(adminMap, adminToggle, markers);
    });

  // closes document on ready
});

// clear markers from map
function setMapOnAll(map, markers){
  console.log("in set: "+markers)
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  };
}

function clearMarkers(){
  setMapOnAll(null);
}

function deleteMarkers(){
  clearMarkers();
  markers = [];
}



function addMarker(id, map, adminToggle, markers){
  console.log("in pop: "+markers);
  var request = {placeId: id};
  var tog = adminToggle;
  var service = new google.maps.places.PlacesService(map);
  service.getDetails(request, function (place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      markers.push(marker);
      marker.addListener("click", function(){
        //infowindow toggle?
          console.log(tog);
        if (adminToggle === false){
        }
      })
      var infowindow = new google.maps.InfoWindow();
      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.formatted_address + '<br></div>');
      infowindow.open(map, marker);
    };
  });
};

function showAllLocations(map, adminToggle, markers){
  // console.log("in showAll: "+locationsShown)
  if (locationsShown) {
    setMapOnAll(map, markers);
  }
  else {
    $.ajax({
      method: "GET",
      url: "/admin/hasKannah"
    }).done(function(data){
      for (var i = 0; i < data.length; i++) {
        addMarker(data[i].placeId, map, adminToggle, markers)
      };
      locationsShown = true;
    }).fail(function(err){
      console.log(err)
    });
    locationsShown = true;
  }
}

function getOnePlaceDoc(id){
  $.ajax({
    method: "GET",
    url: "admin/hasKannah/"+id
  }).done(function(data){
    return data[0];
  }).fail(function(err){
    console.log(err);
  });
}



  // // ---------------------------------------//
  // // ----- apply placesID's to map -------- //
  // // ---------------------------------------//

  // $("#find-beer").on("click", function(){
  //   $(".find-beer-toggle").show();
  //   $(".admin-toggle").hide();


  //   var infowindow = new google.maps.InfoWindow();
  //   var initialCenter = new google.maps.LatLng(
  //     39.393981,
  //     -106.016311);
  //   var myOptions =
  //     {
  //     zoom: 6,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP,
  //     center: initialCenter
  //     }


  //   map = new google.maps.Map(document.getElementById("map"), myOptions);
  //   map.addListener('idle', function(){
  //     console.log(map)
  //     var service = new google.maps.places.PlacesService(map);
  //     var arr = hasKannah;
  //     var bounds = map.getBounds();
  //     console.log(arr)
  //     $("#map-listings").empty();
  //     for (var i = 0; i < arr.length; i++) {
  //       console.log(i);
  //       var currentId = arr[i].placeId;
  //       service.getDetails({placeId: currentId}, function(place, status) {
  //         if (status === google.maps.places.PlacesServiceStatus.OK) {
  //           if (bounds.contains(place.geometry.location)){
  //             if(place.opening_hours.open_now){
  //               var style = " style='color:green;'"
  //               var open = "Yes";
  //             }
  //             else {
  //               var style = " style='color:red;'"
  //               var open = "No";
  //             }
  //             $("#map-listings").append("<div class='list'>"+
  //                                       "<h4>"+place.name+"</h4>"+
  //                                       "<a href="+place.formatted_phone_number+">Phone:"+place.formatted_phone_number+"</a>"+
  //                                       "<p>"+place.formatted_address+"</p>"+
  //                                       "<p"+style+">Open: "+open+"</p>"+
  //                                       "</div>"
  //                                      );
  //           }
  //         }
  //       });
  //     };
  //   });

  //   var service = new google.maps.places.PlacesService(map);

  //   function createMarker(place, map){
  //     var marker = new google.maps.Marker({
  //       "map": map,
  //       position: place.geometry.location
  //     });
  //     return marker;
  //   }

  //   var arr = hasKannah;

  //   for (var i = 0; i < arr.length; i++) {
  //     var currentId = arr[i].placeId;
  //     service.getDetails({placeId: currentId}, function(place, status) {
  //       if (status === google.maps.places.PlacesServiceStatus.OK) {
  //         google.maps.event.addListener(
  //           createMarker(place, map),
  //             'click',
  //               function() {
  //                 infowindow.setContent(place.name);
  //                 infowindow.open(map, this);
  //               }
  //         );
  //       }
  //     });
  //   };

  //   // --------- smooth croll ------------- //
  //   $('html, body').animate({
  //     scrollTop: $('#find-beer-scroll-point').offset().top
  //     }, 1000);

  // });


  // // --------------------------------------------------------//
  // // -------- move map and zoom with zip code input -------- //
  // // --------------------------------------------------------//

  //   $(".find-beer-toggle form").on("submit", function(e){
  //     e.preventDefault();
  //     console.log(map);
  //     var geocoder;
  //     geocoder = new google.maps.Geocoder();
  //     var address = document.getElementById("find-beer-input").value;
  //     geocoder.geocode( { 'address': address}, function(results, status) {
  //       if (status == google.maps.GeocoderStatus.OK) {
  //         map.setCenter(results[0].geometry.location);
  //         map.setZoom(14);
  //         }
  //       else {
  //         alert("Geocode was not successful for the following reason: " + status + ", inside");
  //         }
  //       });

  //     $("#find-beer-input").val("");

  // // closes event hanlder
  // });




  // // smooth scroll up to top
  // $(".icon").on("click", function(e){
  //   e.preventDefault();
  //   $('html, body').animate({
  //     scrollTop: $('#top').offset().top
  //     }, 1000);
  //   });


// closes document on ready
//});



// var key = "AIzaSyB4TF76m8LYII0ZiMzzmOy9dP4M5KevyQo";
// var baseUrl = "http://maps.googleapis.com/maps/api/place/details/"

// function getPlaceObject(placeId){
//   $.ajax({
//     method: "GET",
//     url: baseUrl+"json?placeid="+placeId+"&="+key
//   }).done(function(data){
//     return data;
//   }).fail(function(err){

//   });
// };
