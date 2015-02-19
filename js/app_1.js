///////////////////////////////////////////////////////////////////////////
// Enter your mapbox map id here to reference it for the base layer

var mapId = 'will-breitkreutz.l8mm447l'; //<- this references the ugly green map that I made
var token = 'pk.eyJ1Ijoid2lsbC1icmVpdGtyZXV0eiIsImEiOiItMTJGWEF3In0.HEvuRMMVxBVR5-oDYvudxw'; //<- this is my token, use yours.

//Create the map object with your mapId and token
L.mapbox.accessToken = token;
var map = L.mapbox.map('map', mapId);

//Set the view of the map to the whole US
map.setView([39, -96], 4);

//////////////////////Add Data
var dataFileToAdd = 'data/restaurants.geojson';

var featureLayer = L.mapbox.featureLayer();
    
    featureLayer.loadURL(dataFileToAdd);
    featureLayer.addTo(map);

featureLayer.on('ready', function(){
  this.setStyle({
    "marker-color": "#a90a0a",
    "marker-size": "medium"
  });
  map.fitBounds(featureLayer.getBounds());
});

////////////////////////////////
//Add popup

// featureLayer.on('ready', function(){
//     this.eachLayer(function(layer){
//         layer.bindPopup('Restaurant Name: ' + layer.feature.properties.name);
//     });
// });

//clear the panel 
map.on('click', function(){
   $('#info').fadeOut(200);
   $('#info').empty();
});

//handle click on marker
var clickHandler = function(e){
    $('#info').empty();
    
    var feature = e.target.feature;
    
    $('#info').fadeIn(400, function(){
        var info = '';
        info = '<div>Check out this restaurant called ' + feature.properties.name + '</div>';
        $('#info').append(info);
    });
}

//register the click handler
featureLayer.on('ready', function(){
    this.eachLayer(function(layer){
        layer.on('click', clickHandler);
    });
});



