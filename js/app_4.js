// Enter your mapbox map id here to reference it for the base layer

var mapId = 'will-breitkreutz.k6fj4l3f'; //<- this references the ugly green map that I made
var token = 'pk.eyJ1Ijoid2lsbC1icmVpdGtyZXV0eiIsImEiOiItMTJGWEF3In0.HEvuRMMVxBVR5-oDYvudxw'; //<- this is my token, use yours.

//Create the map object with your mapId and token
L.mapbox.accessToken = token;
var map = L.mapbox.map('map', mapId);

//Set the view of the map to the whole US
map.setView([39, -96], 4);

//Hide the info panel when you click on the open map
map.on('click',function(e){
  $('#info').fadeOut(200);
  $('#info').empty();
});

//This is the area we're going to use to add data to our map

var dataFileToAdd = 'data/bike_routes.geojson'; //<- Point this to the file that you want to include on the map

var featureLayer = L.mapbox.featureLayer()
    .loadURL(dataFileToAdd)
    .addTo(map);

featureLayer.eachLayer(function(l){
  l.on('click',clickHandler);
});

featureLayer.on('ready', function() {
    this.setStyle({
        "color": "#ff7800",
        "weight": 5,
        "opacity": 0.65
    });
    map.fitBounds(featureLayer.getBounds());
});

// var myStyle = {
//     "color": "#ff7800",
//     "weight": 5,
//     "opacity": 0.65
// };
//
// $.ajax({
//   url:dataFileToAdd,
//   dataType:'json',
//   success:function(data){
//     L.geoJson(data, {
//         style: myStyle
//     }).addTo(map);
//   }
// });
