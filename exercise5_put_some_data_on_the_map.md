# Exercise 5, Put Some Data on the Map

We now have a fully functional (if pretty boring) mapping app in just a few lines of code.

_Contents of js/exercise4.js_
```javascript
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
```

## Finding some data

Let's liven up the map and put some data on it.

At this point what we need is a dataset in [geojson](www.geojson.org) format.  There are a number of places to find data or ways to convert your own data into geojson.  A couple of places to find data include these below, there are tons of data out there though, it just takes a little digging:

_In the live workshop we'll walk through extracting some data from overpass-turbo_

1. Download some at [overpass-turbo](http://overpass-turbo.eu/)
2. Make your own at [geojson.io](http://www.geojson.io)

For the lazy out there, I've also included a couple of datasets in this repository, you can find them in the /data folder.  Notice that if you look at the datasets in GitHub, it will let you preview the data on a map, pretty cool huh.

Pick one of the datasets in the /data folder, or get ahold of one of your own and save it in the /data folder before moving on to the next step.

## Add GeoJSON to the map

Go to prose.io and open your js/exercise4.js file, we're going to make some edits.

At the end of the file, add the following code:

_We need to set the path to our data file to a variable, replace parks.geojson with the data file that you want to use_
```javascript
var dataFileToAdd = 'data/parks.geojson';
```

_Then we need to create a featureLayer to hold the data_
```javascript
var featureLayer = L.mapbox.featureLayer()
    .loadURL(dataFileToAdd)
    .addTo(map);
```

_Finally we're going to set the style and zoom the map to the layer once the featureLayer is ready to render_
```javascript
featureLayer.on('ready', function() {
    this.setStyle({
        "color": "#6583BF",
        "fillColor": "#6583BF",
        "weight": .5,
        "opacity": 0.65
    });
    map.fitBounds(featureLayer.getBounds());
});
```

That's it, you've added data to your map!  Feel free to change any of the style information to make it look the best it can on top of your basemap.

Go ahead and open the map up in another tab and double check that you now have data on top of your basemap.  If you do, time to move on to the next [exercise](https://github.com/willbreitkreutz/web_mapping_workshop/blob/gh-pages/exercise6_adding_basic_popups.md)
