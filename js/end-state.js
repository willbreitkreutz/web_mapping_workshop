// Here is the javascript setup for a basic map:

// Enter your mapbox map id here to reference it for the base layer,
// this one references the ugly green map that I made.
var mapId = 'will-breitkreutz.k6fj4l3f';

// And this is my access token, use yours.
var accessToken = 'pk.eyJ1Ijoid2lsbC1icmVpdGtyZXV0eiIsImEiOiItMTJGWEF3In0.HEvuRMMVxBVR5-oDYvudxw';

// Create the map object with your mapId and token,
// referencing the DOM element where you want the map to go.
L.mapbox.accessToken = accessToken;
var map = L.mapbox.map('map', mapId);

// Set the initial view of the map to the whole US
map.setView([39, -96], 4);

// Great, now we have a basic web map!

var dataFileToAdd = 'data/restaurants.geojson';

var featureLayer = L.mapbox.featureLayer()
  .loadURL(dataFileToAdd)
  .addTo(map);

featureLayer.on('ready', function() {
  this.eachLayer(function(layer){
    layer.setIcon(L.mapbox.marker.icon({
      'marker-color': '#8834bb',
      'marker-size': 'medium',
      'marker-symbol': 'restaurant'
    }))
  });
  map.fitBounds(featureLayer.getBounds());
});

// exercise 7
var clickHandler = function(e){
  $('#info').empty();

  var feature = e.target.feature;

  $('#sidebar').fadeIn(400,function(){
    var info = '';

    info += '<div>'
    info += '<h2>' + feature.properties.name + '</h2>'
    if(feature.properties.phone) info +=   '<p>'  + feature.properties.cuisine + '</p>'
    if(feature.properties.phone) info +=   '<p>'  + feature.properties.phone + '</p>'
    if(feature.properties.phone) info +=   '<p><a href="' + feature.properties.website + '">'  + feature.properties.website + '</a></p>'
    info += '</div>'

    $('#info').append(info);
  });

  var myGeoJSON = myLocation.getGeoJSON();
  getDirections(myGeoJSON.geometry.coordinates, feature.geometry.coordinates);
};

featureLayer.on('ready', function(){
  this.eachLayer(function(layer){
    layer.on('click', clickHandler);
  });
});

map.on('click',function(e){
	$('#sidebar').fadeOut(200);
  $('#info').empty();
});

// exercise 8
var myLocation = L.mapbox.featureLayer().addTo(map);

    myLocation.setGeoJSON({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-78.641, 35.774]
        },
        properties: {
            'title': 'Here I am!',
            'marker-color': '#ff8888',
            'marker-symbol': 'star'
        }
    });

//map.locate({setView:true});


var routeLine = L.mapbox.featureLayer().addTo(map);
var routeHighlight = L.mapbox.featureLayer().addTo(map);
function getDirections(frm, to){
  var jsonPayload = JSON.stringify({
    locations:[
      {lat: frm[1], lon: frm[0] },
      {lat: to[1], lon: to[0] }
    ],
    costing: 'pedestrian',
    units: 'miles'
  });
  $.ajax({
    url:'http://valhalla.mapzen.com/route',
    data:{
      json:jsonPayload,
      api_key: 'valhalla-gwtf3x2'
    }
  }).done(function(data){
    var routeShape = polyline.decode(data.trip.legs[0].shape);
    routeLine.setGeoJSON({
      type:'Feature',
      geometry:{
        type:'LineString',
        coordinates: routeShape
      },
      properties:{
        "stroke":'#ed23f1',
        "stroke-opacity":0.8,
        "stroke-width":8
      }
    });

    $('#directions').fadeIn(400, function(){
      $('#summary').empty();
      $('#distance').text((Math.round(data.trip.summary.length * 100) / 100) + ' ' + data.trip.units);
      $('#time').text((Math.round(data.trip.legs[0].summary.time / 60 * 100) / 100) + ' min');

      data.trip.legs[0].maneuvers.forEach(function(item){
        var direction = ''
        direction += '<li class="instruction" data-begin=' + item.begin_shape_index + ' data-end=' + item.end_shape_index + '>';
        if(item.verbal_post_transition_instruction) direction += '<p class="post-transition">' + item.verbal_post_transition_instruction + '</p>';
        if(item.verbal_pre_transition_instruction) direction += '<p class="pre-transition">' + item.verbal_pre_transition_instruction + '</p>';
        direction += '</li>';
        $('#summary').append(direction);
      });

      console.log(data)

    });

    $('.instruction').on('mouseover', function(){

      var begin = Number($(this).attr('data-begin'));
      var end = Number($(this).attr('data-end'));
      console.log(begin, ' -- ', end + 1)
      routeHighlight.setGeoJSON({
        type:'Feature',
        geometry:{
          type: begin === end ? 'Point' : 'LineString',
          coordinates: begin === end ? routeShape.slice(begin)[0] : routeShape.slice(begin,(end + 1))
        },
        properties:{
          "stroke":'#1ea6f2',
          "stroke-opacity":0.9,
          "stroke-width":10,
          "marker-color": '#1ea6f2',
          "marker-size": 'small',
          "marker-symbol": 'star'
        }
      })
    })
    $('.instruction').on('mouseout', function(){
      routeHighlight.clearLayers()
    })

  })
}

map.on('click',function(e){
  routeLine.clearLayers();
});
