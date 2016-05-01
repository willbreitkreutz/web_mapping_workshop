//exercise 6
featureLayer.on('ready', function(){
  this.eachLayer(function(layer){
    layer.bindPopup('Welcome to ' + layer.feature.properties.name);
  });
});
