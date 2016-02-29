Web Mapping Workshop
====================

# What _is_ a web-map?

There are a ton of different ways of putting mapping data on the web.  Ranging from simple images to PDF's that the user has to download to dynamic and complex web mapping applications.

> To simplify things a bit, when we say **web-map** we're talking about an interactive mapping application generally using a JavaScript framework to facilitate the basic pan, zoom and identify workflows native to interactive web mapping.

We're also going to break the web-map into it's constituant parts in order to better understand how it is put together and how to implement our own.

## Data

Data used on web-maps (and in any other kind of map for that matter) can be divided roughly into two groups, contextual and thematic.  **Contextual** data generally provides the backdrop giving the map user context, both spatially and topically.  **Thematic** data is the primary focus of the map, the data that is used to tell a story or get a point across.

### Contextual Data

Base-maps are the most commonly used type of contextual data.  Services such as Google Maps, MapQuest and MapBox provide base-maps in varying levels of cartographic customizability.  These services pull their data (roads, cities, etc...) from large-scale commercial data aggregators such as TeleAtlas and Navteq, or from open data sources such as OpenStreetMap.

Because of the relatively static nature of the base-map data, it is usually served up in image tile format.

###### Tiles you say?

Pre-rendered maps of the base data are divided up into image tiles that are 256x256 px images.  Image tiles are used to efficiently display base-map data.  The most commonly used convention of tiling maps starts at zoom level 0 (z0).  z0 is made up of a single 256x256px tile that covers the entire world.  Each subsequent zoom level (down to 22 on average) is calculated by breaking up each tile from the previous zoom level into four equally sized tiles, rendered at 256x256px.

For more information about tiles, check out [this MapBox article](https://www.mapbox.com/foundations/how-web-maps-work/)

### Thematic Data

A successful map (web or otherwise) tells a story.  This story is usually told using the thematic data that is displayed on top of the contextual base-map.  Formats of thematic data can vary widely depending on the story to be told.  Static datasets can be mapped showing a condition at a certain time, or temporal dimensions can be used to create animated maps showing changing conditions over time.  

Thematic data can be integrated into the tile base-map image service, as it's own tile based service, or as vector data that is drawn on top of the map in the browser.

###### A note about GeoJSON

Data rendered on the map in the browser is commonly managed in a data format called GeoJSON.  JSON (JavaScript Object Notation) is a way of organizing data piggy-backing on the way JavaScript handles objects.  JSON is becoming ubiquitous on the web for transferring data from server to client and back.  GeoJSON is a specification using JSON specifically for organizing geographic data.

Check out the spec for [more information about GeoJSON](geojson.org)

## Mapping Client

The mapping client is the glue that takes all of the data we talked about earlier and puts it on the web page in the right place, allowing you the user to pan around, zoom in and out and interrogate the mapped data.

All of the widely used web-mapping client libraries are JavaScript based.  These include:

* Google Maps JavaScript API
* ESRI ArcGIS JavaScript API
* MapBox JavaScript API
* Leaflet
* OpenLayers
* [many others...](http://techslides.com/50-javascript-libraries-and-plugins-for-maps/)

=================
Ok, let's get started with [exercise 1, setting up our web map](https://github.com/willbreitkreutz/web_mapping_workshop/blob/gh-pages/exercise1.md)
