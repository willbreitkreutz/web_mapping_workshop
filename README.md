Web Mapping Workshop
====================

# UPDATE

Here we go, we're set to run the workshop at FOSS4G NA this year in Raleagh!  Keep an eye on the repo for updates and changes as we get ready!

## Outline

### 1.0 What is a web-map? (30 min presentation)

There are a ton of different ways of putting mapping data on the web.  These range from simple images to PDF's that the user has to download to dynamic and complex web mapping applications.

> In our context a **web-map** is an interactive mapping application generally using a JavaScript framework to facilitate the basic pan, zoom and identify workflows native to interactive web mapping.

We're also going to break the web-map into it's constituant parts in order to better understand how it is put together and how to implement our own.

#### 1.1 Data

Data used on web-maps (and in any other kind of map for that matter) can be divided roughly into two groups, contextual and topical.  Contextual data generally provides the backdrop giving the map user context, both spatially and topically.  Topical data is the primary focus of the map, the data that is used to tell a story or get a point across.

##### 1.1.1 Contextual

Base-maps are the most commonly used type of contextual data.  Services such as Google Maps, MapQuest and MapBox provide base-maps in varying levels of cartographic customizability.  These services pull their data (roads, cities, etc...) from large-scale commercial data aggregators such as TeleAtlas and Navteq, or from open data sources such as OpenStreetMap.

Because of the relatively static nature of the base-map data, it is usually served up in image tile format.

###### Tiles (Raster Data)

Pre-rendered maps of the base data are divided up into image tiles that are 256x256 px images.  Image tiles are used to efficiently display base-map data.  The most commonly used convention of tiling maps starts at zoom level 0 (z0).  z0 is made up of a single 256x256px tile that covers the entire world.  Each subsequent zoom level (down to 22 on average) is calculated by breaking up each tile from the previous zoom level into four equally sized tiles, rendered at 256x256px.

[more information about tiles](https://www.mapbox.com/foundations/how-web-maps-work/)

##### 1.1.2 Topical

A successful map (web or otherwise) tells a story.  This story is usually told using the topical data that is displayed on top of the contextual base-map.  Formats of topical data can vary widely depending on the story to be told.  Static datasets can be mapped showing a condition at a certain time, or temporal dimensions can be used to create animated maps showing changing conditions over time.  Topical data can be integrated into the tile base-map image service, as it's own tile based service, or as vector data that is drawn on top of the map in the browser.

###### GeoJSON (Vector Data)

Data rendered on the map in the browser is most commonly managed in a data format called GeoJSON.  JSON (JavaScript Object Notation) is a way of organizing data piggy-backing on the way JavaScript handles objects.  JSON is becoming ubiquitous on the web for transferring data from server to client and back.  GeoJSON is a specification built on top of JSON specifically for organizing geographic data.

[more information about GeoJSON](geojson.org)

#### 1.2 Mapping Client

The mapping client is the glue that takes all of the data we talked about earlier and puts it on the web page in the right place, allowing you the user to pan around, zoom in and out and interrogate the mapped data.

All of the widely used web-mapping client libraries are JavaScript based.  These include:

* Google Maps JavaScript API
* ESRI ArcGIS JavaScript API
* MapBox JavaScript API
* Leaflet
* OpenLayers
* [many others...](http://techslides.com/50-javascript-libraries-and-plugins-for-maps/)

### 2.0 Lets Make A Web-Map

#### 2.1 Base-Map (< 5 min presentation, 20 min exercise)

We're going to go to [MapBox](https://www.mapbox.com/) and create a free account and then theme up a good base-map to use in our application.

We're also going to mention [TileMill](https://www.mapbox.com/tilemill/) for rolling your own CartoCSS based tile sets and [Mapbox Studio](https://www.mapbox.com/mapbox-studio/#darwin) for leveraging vector tiles served by mapbox.  Won't have enough time to do either of these, but should mention them.

#### 2.2 Hosting (< 5 min presentation 10 min exercise)

So, since we're doing a web-map, we have to have a place on the web to host our map.  Luckily GitHub provides us with a very easy way to publish public-facing websites.

We're going to go get a free account on [GitHub](www.github.com), then we're going to fork the project that I've created to be the basis for our application.  The project is going to have just the basics for setting up a web map:

* The Project Folder
  * The javascript folder for all of the .js files
  * A data folder for storing all of our data
  * And index.html for linking to our js and data in the browser.

By forking the project, all of the initial set-up will be done and by adding the link to the MapBox base-map that we created, we can quickly see that we have a map published online.

#### 2.3 Put some data on the map (< 5 min presentation)

##### Digitize some data (5 min exercise)

Using [geojson.io](http://geojson.io/) we can create our own GeoJSON files from scratch.

##### Extract some data (15 min exercise)

Using [Overpass-Turbo](http://overpass-turbo.eu/) we can query OpenStreetMap for data of all types and link to or extract that data for use on our maps.  We will look at the following data extract options and how they can be used in our maps.

* Download as GeoJSON
* Link to the Overpass-Turbo API
* Save the data to a Gist

##### Add data to the map (30 min exercise)

We'll work on adding the data to the map and theming it to make it look good on top of the base-maps that we created earlier.

#### 2.4 Add some functionality to the map

##### Simple pop-ups (15 min exercise)

We will add some simple click handlers to the mapped data so that a pop-up appears on click and displays some of the data's attribution.

##### Off-map details on click (15 min exercise)

We'll edit our click handlers to display the attribute data off of the map in a separate panel giving us much more room to display the attributes and style the results.

#### 2.5 Keep adding stuff! (as much time as you want!)
