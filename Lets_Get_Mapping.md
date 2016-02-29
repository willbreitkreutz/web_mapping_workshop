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
