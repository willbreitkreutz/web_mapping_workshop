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
    
    featureLayer.loadUrl(dataFileToAdd);
    featureLayer.addTo(map);

featureLayer.on('ready' function(){
  this.setStyle({
    "marker-color": "#777777",
    "marker-size": "medium"
  });
  map.fitBounds(featureLayer.getBounds());
});

////////////////////////////////
