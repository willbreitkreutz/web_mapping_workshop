// exercise 7
//
// Clear out the info panel when you click somewhere in the map
map.on('click',function(e){
	$('#info').fadeOut(200);
    $('#info').empty();
});

// Use this function to handle the click event on the data
var clickHandler = function(e){
  $('#info').empty();

  //e is the click event in the browser, it's target is our element that was clicked
  var feature = e.target.feature;

  $('#info').fadeIn(400,function(){
    var info = '';

    info += '<div>'
    info +=   '<h2>' + feature.properties.LABEL + '</h2>'
    info +=   '<p>'  + feature.properties.LOCATION + '</p>'
    info += '</div>'

    $('#info').append(info);
  });
};

// Register the click event on each of the features in the map
featureLayer.on('ready', function(){
  this.eachLayer(function(layer){
    layer.on('click', clickHandler);
  });
});