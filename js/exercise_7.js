// exercise 7
var clickHandler = function(e){
  $('#info').empty();

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

featureLayer.on('ready', function(){
  this.eachLayer(function(layer){
    layer.on('click', clickHandler);
  });
});

map.on('click',function(e){
	$('#info').fadeOut(200);
    $('#info').empty();
});
