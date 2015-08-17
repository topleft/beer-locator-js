// //add scripts

// $(document).on('ready', function() {

//   // function initialize() {
//   // var mapProp = {
//   //   center:new google.maps.LatLng(51.508742,-0.120850),
//   //   zoom:5,
//   //   mapTypeId:google.maps.MapTypeId.ROADMAP
//   // };
//   // var map=new google.maps.Map(document.getElementById("map"),mapProp);
//   // }
//   // google.maps.event.addDomListener(window, 'load', initialize);

//   // ------- create lat lng loctions ------- //
//   var edgeWater = new google.maps.LatLng(39.0553263,-108.5576635)
//   var kcbc = new google.maps.LatLng(39.0853043,-108.5522896)

//   var locationsArray = [edgeWater, kcbc]

//   // --------- create map options ----------- //
//   var map;
//   var myOptions = {
//     zoom: 12,
//     mapTypeId: google.maps.MapTypeId.ROADMAP,
//     center: locationsArray[0]
//   };

//   // --------- create map ------ //
//   var map = new google.maps.Map(document.getElementById("map"), myOptions);


//   // ---------- add search places box ---------- //

//   var input = document.getElementById("pac-input");
//   var searchBox = new google.maps.places.SearchBox(input);
//   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//   map.addListener("bounds_changed", function(){
//     searchBox.setBounds(map.getBounds());
//   });

//   var markers = [];

//   searchBox.addListener('places_changed', function(){
//     var places = searchBox.getPlaces();

//     if (places.length == 0){
//       return;
//     }
//     markers.forEach(function(marker){
//       marker.setMap(null);
//     });

//     markers = [];

//     //For each get the icon name and location
//     var bounds = new google.maps.LatLngBounds();
//     places.forEach(function(place){
//       var icon = {
//         url: place.icon,
//         size: new google.maps.Size(71, 71),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(17, 34),
//         scaledSize: new google.maps.Size(25, 25)
//       }

//       markers.push(new google.maps.Marker({
//         map: map,
//         // icon: icon,
//         title: place.name,
//         position: place.geometry.location
//       }));

//     });

//   });

//   // Create a marker for each place.







//   //------- create markers --------//
//   // var markerArray = [];

//   // function createMarker(locationArray){
//   //   console.log(locationArray)
//   //   for (var i = 0; i < locationArray.length; i++) {
//   //     markerArray.push(new google.maps.Marker({
//   //       position: locationArray[i],
//   //     })
//   //   );
//   // };
//   //     return markerArray;
//   // };


//   // function setMarker(markerArray){
//   //   for (var i = 0; i < markerArray.length; i++) {
//   //     console.log(markerArray)
//   //      markerArray[i].setMap(map);
//   //   };
//   // };

//   // setMarker(createMarker(locationsArray));

//   // ----------- set popup window for marker -------//
//   // var infowindow = new google.maps.InfoWindow({
//   // content:"KCBC!"
//   // });

//   // infowindow.open(map, marker);


// // ---------- lat long pop up on click ------------- //
//   // google.maps.event.addListener(map, "click", function(event){
//   //   placeMarker(event.latLng)
//   // });

//   // function placeMarker(location){
//   //   var marker = new google.maps.Marker({
//   //     position: location,
//   //     map: map
//   //   });
//   //   var infoWindow = new google.maps.InfoWindow({
//   //     content: "Latitude: "+ location.lat() +
//   //     '<br>Longitude: ' + location.lng()
//   //   });
//   //   infoWindow.open(map,marker)
//   // }

// });
