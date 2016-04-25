// Here is the javascript setup for a basic map:

// Enter your mapbox map id here to reference it for the base layer,
// this one references the ugly green map that I made.
var mapId = 'willbreitkreutzwork.p9ej01m9';

// And this is my access token, use yours.
var accessToken = 'pk.eyJ1Ijoid2lsbGJyZWl0a3JldXR6d29yayIsImEiOiJjaWw3Y3hnaDkwMzRwdjRtMnp3YnQyZXV4In0.VZckyQqWHi8mzdDxRtmqlQ';

// Create the map object with your mapId and token, 
// referencing the DOM element where you want the map to go.
L.mapbox.accessToken = accessToken;
var map = L.mapbox.map('map', mapId);

// Set the initial view of the map to the whole US
map.setView([39, -96], 4);

// Great, now we have a basic web map!
