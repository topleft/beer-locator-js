//add scripts

$(document).on('ready', function() {

  // function initialize() {
  // var mapProp = {
  //   center:new google.maps.LatLng(51.508742,-0.120850),
  //   zoom:5,
  //   mapTypeId:google.maps.MapTypeId.ROADMAP
  // };
  // var map=new google.maps.Map(document.getElementById("map"),mapProp);
  // }
  // google.maps.event.addDomListener(window, 'load', initialize);


  var map;
  var kcbc = new google.maps.LatLng(39.0853043,-108.5522896)
  var myOptions = {
    zoom: 9,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    center: kcbc
  };


  var map = new google.maps.Map(document.getElementById("map"), myOptions);

  var marker = new google.maps.Marker({
  position:kcbc,
  animation:google.maps.Animation.BOUNCE
  });

  marker.setMap(map);

  var infowindow = new google.maps.InfoWindow({
  content:"KCBC!"
  });

  infowindow.open(map, marker);


});
