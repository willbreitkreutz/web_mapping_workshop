# Exercise 8, Bonus Round! Locate Me

Most browsers have the ability to get the location of the device that they are running on from a variety of sources from GPS to wifi and physical networks.  We can use this information to place a point on the map and zoom the user there so they can quickly make the map relevant to their current location.  Of course the browser has to get permission from the user before we can access this data.  You can read more on the [Geolocation API](https://en.wikipedia.org/wiki/W3C_Geolocation_API) on wikipedia.

Let's start by creating a variable to hold the current location:

```javascript
var myLocation = L.mapbox.featureLayer().addTo(map);
```

We created a blank featureLayer and added it to the map, it won't show up or do anything since there's no location information there yet.

The MapBox.js map mapping library gives a simple interface for querying the users location, we just need to call `map.locate()`.  The only problem is the we also need to tell the app what to do once we get a location.  

Let's write a handler function to tell the map to add an icon wherever the user is located:

```javascript
map.on('locationfound', function(e) {

    myLocation.setGeoJSON({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
            'title': 'Here I am!',
            'marker-color': '#ff8888',
            'marker-symbol': 'star'
        }
    });

});
```

Now we can call `map.locate()` to add the users location to the map when the app starts up:

```javascript
map.locate({setView:true});
```

#Congratulations!  

You've made a pretty great start on developing a mapping application and didn't event have to leave the comfort of the browser to do it!

Time to dig into the [docs and examples](https://www.mapbox.com/mapbox.js/api) and build away!  
