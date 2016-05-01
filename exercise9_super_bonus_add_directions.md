# Exercise 9, Super Bonus Round!  Directions API

We already have a nice mapping application, but what if we added some even fancier functionality.  We're mapping restaurants, and our location, seems reasonable that we would want to figure out how to get from where we are now, to the restaurant of our choice!

This is going to be a more complex exercise, but if you made it this far, I know you're gonna do great!

## Mapzen Directions API

Mapzen is a spatial software and service company that's doing some awesome work with open datasets.  They've put together a few API's that make it super easy to do geocoding and direction finding.  We're going to use their [Mapzen Turn-by-Turn](https://mapzen.com/projects/turn-by-turn) project to get directions to our restaurants.

In order to access their API, you need to register for an API Key.  You can register with Mapzen by authorizing access through your GitHub account, which makes it super easy.  I've created an API key for this exercise, it's on the free tier and won't every be upgraded, and might be removed by the time you get here... so you should get your own key if you want to use this or any of their other services in the future.

## Requesting Directions

By reading the documentation we found out that to request directions, we need to make a call to `http://valhalla.mapzen.com/route` (best name ever in my opinion) with some query parameters describing what kind of information we're looking for.

Let's start by creating a function that we can call with from and to locations that will eventually add our route to the map.

So at the end of our JS file, let's start to add some code:

```javascript
function getDirections(frm, to){

}
```

We know that to get our directions, we need to make a GET request with a JSON payload describing our query.  Since we're using JQuery in our project we can leverage their AJAX request functionality to make the request, but first, let's build our JSON query object:

```javascript
function getDirections(frm, to){
  var jsonPayload = JSON.stringify({
    locations:[
      {lat: frm[1], lon: frm[0]},
      {lat: to[1], lon: to[0]}
    ],
    costing: 'pedestrian',
    units: 'miles'
  })
}
```

We have to run `JSON.stringify()` on the JSON to convert it to a string that can be sent as a query parameter in the URL string.

Now let's add the AJAX code that will make our request for us:

```javascript
function getDirections(frm, to){
  var jsonPayload = JSON.stringify({
    locations:[
      {lat: frm[1], lon: frm[0]},
      {lat: to[1], lon: to[0]}
    ],
    costing: 'pedestrian',
    units: 'miles'
  })
  $.ajax({
    url:'http://valhalla.mapzen.com/route',
    data:{
      json: jsonPayload,
      api_key: 'valhalla-gwtf3x2'
    }
  })
}
```

## Parsing the Response

The code above will make the request, but nothing will happen unless we tell JQuery what to do with the response, we do that by chaining on a handler function using the `.done()` function of the promise-like object returned by the `$.ajax` function:

```javascript
function getDirections(frm, to){
  var jsonPayload = JSON.stringify({
    locations:[
      {lat: frm[1], lon: frm[0]},
      {lat: to[1], lon: to[0]}
    ],
    costing: 'pedestrian',
    units: 'miles'
  })
  $.ajax({
    url:'http://valhalla.mapzen.com/route',
    data:{
      json: jsonPayload,
      api_key: 'valhalla-gwtf3x2'
    }
  }).done(function(data){

  })
}
```

## Add our route to the map

Wait, what do we want to do with our directions data?  Let's create a route feature layer so that we can display the route line on the map, to do that we want to create the feature layer before we create our `getDirections()` function, and add the empty featureLayer to the map so when we add data to it later, it will automatically show up for our user:

```javascript
var routeLine = L.mapbox.featureLayer().addTo(map);
function getDirections(frm, to){
  var jsonPayload = JSON.stringify({
    locations:[
      {lat: frm[1], lon: frm[0]},
      {lat: to[1], lon: to[0]}
    ],
    costing: 'pedestrian',
    units: 'miles'
  })
  $.ajax({
    url:'http://valhalla.mapzen.com/route',
    data:{
      json: jsonPayload,
      api_key: 'valhalla-gwtf3x2'
    }
  }).done(function(data){

  })
}
```

Ok, now we can do something with the response data.  The turn-by-turn API returns our route in an encoded geometry to save bandwidth rather than in straight-up GeoJSON.  This means we have to decode it before we can use it.  Luckily, Mapzen provides a [decode function](https://mapzen.com/documentation/turn-by-turn/decoding/) that we can borrow to do this for us, reading the docs FTW!:

```javascript
var routeLine = L.mapbox.featureLayer().addTo(map);
function getDirections(frm, to){
  var jsonPayload = JSON.stringify({
    locations:[
      {lat: frm[1], lon: frm[0]},
      {lat: to[1], lon: to[0]}
    ],
    costing: 'pedestrian',
    units: 'miles'
  })
  $.ajax({
    url:'http://valhalla.mapzen.com/route',
    data:{
      json: jsonPayload,
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
        "stroke": '#ed23f1',
        "stroke-opacity": 0.8,
        "stroke-width": 8
      }
    })
  })
}
```

Awesome, now we're adding our route from the API response to the routeLine featureLayer!  But wait, how do we actually call the `getDirections()` function?  We need to go back up to where we handle the click event on a restaurant feature and make sure that we call `getDirections()` to add the route to the map:

```javascript
//Back in lines 53-56ish
  $('#info').append(info);
});

var myGeoJSON = myLocation.getGeoJSON();

getDirections(myGeoJSON.geometry.coordinates, feature.geometry.coordinates);
```

We're adding the call to `getDirections()` using the users location from `myGeoJSON` as the from location and the location of the restaurant that was clicked on as the to location.

Time to test, go ahead and reload the application and see if you are seeing routes show up between your location and the restaurant that you click on.

## Add Directions to the Sidebar

That's pretty cool and all, but what if we want to give the user a list of directions along with the route on the map?  We've got a good place for it in the right sidebar, under the restaurant information.

In this example app, I've already created a place for the directions to go, we just need to parse them out of the response and add them to the UI.

To start, let's fade our directions region into being using JQuery, so inside our ajax data handler function, after we `setGeoJSON` on our featureLayer, let's add some code:

```javascript
var routeLine = L.mapbox.featureLayer().addTo(map);
function getDirections(frm, to){
  var jsonPayload = JSON.stringify({
    locations:[
      {lat: frm[1], lon: frm[0]},
      {lat: to[1], lon: to[0]}
    ],
    costing: 'pedestrian',
    units: 'miles'
  })
  $.ajax({
    url:'http://valhalla.mapzen.com/route',
    data:{
      json: jsonPayload,
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
        "stroke": '#ed23f1',
        "stroke-opacity": 0.8,
        "stroke-width": 8
      }
    })

    $('#directions').fadeIn(400, function(){

    })

  })
}
```

Inside our `fadeIn()` callback is where we'll actually add the information to the DOM, (remember to empty the section of any previous directions as the first step).  Let's start by adding the distance and travel time for the route:

```javascript
    $('#directions').fadeIn(400, function(){
      $('#summary').empty();
      $('#distance').text((Math.round(data.trip.summary.length * 100) / 100) + data.trip.units);
      $('#time').text((Math.round(data.trip.summary.time / 60 * 100) / 100) + ' min');
    })
```

That's pretty useful information, but what about each of the step-by-step directions?  To add those, we'll loop over the maneuvers array and create a list item to add to our summary list that's already in the UI.  We'll create the list item much like we create the DOM elements for the restaurant name and address we formatted earlier:

```javascript
    $('#directions').fadeIn(400, function(){
      $('#summary').empty();
      $('#distance').text((Math.round(data.trip.summary.length * 100) / 100) + data.trip.units);
      $('#time').text((Math.round(data.trip.summary.time / 60 * 100) / 100) + ' min');

      data.trip.legs[0].maneuvers.forEach(function(item){
        var direction = '';
        direction += '<li class="instruction" data-begin=' + item.begin_shape_index + ' data-end=' + item.end_shape_index + '>';
        if(item.verbal_post_transition_instruction) direction += '<p class="post-transition">' + item.verbal_post_transition_instruction + '</p>';
        if(item.verbal_pre_transition_instruction) direction += '<p class="pre-transition">' + item.verbal_pre_transition_instruction + '</p>';
        direction += '</li>';
        $('#summary').append(direction);
      })
    })
```

Now we should be seeing a list of turn-by-turn directions show up in our right sidebar when we click on a restaurant!

The only problem that we're having right now is that our route never goes away, even when the sidebar is removed by clicking on a blank area in the map.  To fix this, we just need to add another click handler to the very end of our file that clears all of the data from our routeLine featureLayer:

```javascript
// all the way to the end of our file
map.on('click', function(){
  routeLine.clearLayers();
})
```

## Highlight the route parts

As a super-duper bonus, let's highlight the regions of the route that correspond to each of the turn-by-turn directions in our sidebar if the user mouses over them.

Back inside our `.done()` handler, below the `$('#directions').fadeIn()` function call, let's add a handler for the mouseover event on each of our instructions:

```javascript
    $('.instruction').on('mouseover', function(){

    })
```

Each of our instructions contains references to the beginning and end index locations of the beginning and end coordinates for that section of the route in the overall coordinate array for the route.  We added them as the `data-begin` and `data-end` attributes.  Let's set those to variables that we can use to extract our small shape from the larger route:

```javascript
    $('.instruction').on('mouseover', function(){
      var begin = Number($(this).attr('data-begin'));
      var end = Number($(this).attr('data-end'));
    })
```

Now, how do we display our sub-route data?  We'll create another featureLayer to hold the moused-over section of the route and call it `routeHighlight`, so go back up to where we create the routeLine and add the following line to create our routeHighlight:

```javascript
var routeLine = L.mapbox.featureLayer().addTo(map);
var routeHighlight = L.mapbox.featureLayer().addTo(map); //<--
function getDirections(frm, to){
```

Awesome, now let's add our sub-route to the `routeHighlight` featureLayer on mouseover: (note that sometimes our sub-route is a single point so we should handle both points and line geometries)

```javascript
    $('.instruction').on('mouseover', function(){
      var begin = Number($(this).attr('data-begin'));
      var end = Number($(this).attr('data-end'));

      routeHighlight.setGeoJSON({
        type:'Feature',
        geometry:{
          type: begin === end ? 'Point' : 'LineString',
          coordinates: begin === end ? routeShape.slice(begin)[0] : routeShape.slice(begin,(end + 1))
        },
        properties:{
          "stroke": '#1ea6f2',
          "stroke-opacity": 0.9,
          "stroke-width": 10,
          "marker-color": '#1ea6f2',
          "marker-size": 'small',
          "marker-symbol": 'star'
        }
      })
    })
```

The only other thing we need to do is a little clean up, when the user mouses out of the sidebar, we should remove the highlight from the map.  Add the following handler after our mouseover code:

```javascript
$('.instruction').on('mouseout', function(){
  routeHighlight.clearLayers()
})
```

Sweet, now see what else you can add to the application! Time to dig into the [docs and examples](https://www.mapbox.com/mapbox.js/api) and build away!  
