# Exercise 4, A Basic Map

We've already looked at how GitHub lets us store code and publish web sites, now let's get rid of that ugly green map and publish a basic mapping site with the base map you created in the last exercise.

## Editor of the Day

Now you could download all of the code for the project to your local machine, make the edits and push it back to GitHub for deployment, that would work.  We're going to short cut that workflow and keep all of our work in the browser!

[Prose.io](http://www.prose.io) is an awesome little tool that lets you access and edit files hosted in GitHub.  It's designed for editing blog posts in [Markdown](https://en.wikipedia.org/wiki/Markdown), but works just as well for doing quick edits in your code.  I wouldn't use it for building a large application, but for the app we're putting together it will work beautifully.  You will need to authorize the Prose app using your GitHub account, but after that access is pretty seamless.

## Explore the Project

Since you forked my project, you now have a complete working copy of the ugly green map that I built out.  Check it out at

http://www. {your GitHub user name} .github.io/web_mapping_workshop/

Is the map a ugly shade of green?  Great!  Keep that link handy, that's where you're going to build your app.

Let's go back to Prose.io to explore how that map works.

Open the index.html file at the root directory.

Let's break it down into the major parts:

```html

<!DOCTYPE html>
<html>
<head>
<meta charset=utf-8 />
<title>A simple map</title>
<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
<link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.4/mapbox.css' rel='stylesheet' />
<link href='css/app.css' rel='stylesheet' />
<link href='css/save_shape_to_gist.css' rel='stylesheet' />
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src='https://api.tiles.mapbox.com/mapbox.js/v2.1.4/mapbox.js'></script>
</head>

```

The top part of the file, or the `<HEAD>` section contains links to all of the css and javascript libraries that the app needs to function, these are the 3rd party files that we're leveraging without having to write ourselves.

```html

<body>

<!-- These are the only DOM elements we need for an awesome app -->
<div id='map'></div>
<div id='info' style='display:none'></div>

```

The body of the .html file begins now.  We've got a pretty simple file here, the only markup we need are two elements, one to hold our map, and another that we're going to use in exercise 7.

```html

<!-- Change the reference here to change which javascript file we are using in the app -->
<script src='js/exercise_4.js'></script>

<!--
<script src='js/exercise_5.js'></script>
<script src='js/exercise_6.js'></script>
<script src='js/exercise_7.js'></script>
<script src='js/exercise_8.js'></script>
-->

```

Our JavaScript comes after the markup, toward the bottom of the file.  This ensures that the browser is done reading and understanding the DOM structure before we start leveraging it to create an application.

Notice how the exercise 4 file is the only uncommented one.  This way if you happen to fall behind as we move through exercises, you can just uncomment the relavent file, but I'd rather you write all your code in the exercise 4 file as we build the app.

```html

<!-- Special bonus stuff we'll cover if there is time, -->
<script src='lib/spin.js'></script>
<script src='lib/shp.js'></script>
<div id='drag-overlay' style='display:none'>
<p class="drop-label">Drop a shapezip here</p>
</div>
<script src='js/save_shape_to_gist.js'></script>
</body>
</html>

```

At the bottom of the page is the special bonus section, we'll cover what it does if we have time at the end of the workshop. Also, you can check out [special_bonus.md](https://github.com/willbreitkreutz/web_mapping_workshop/blob/gh-pages/special_bonus.md) later if we don't quite get there.

## Get Rid of the Ugly!

Ok, now let's get rid of that ugly green map.

Open `js/exercise_4.js` in Prose.io.

You'll notice that I've inluded a map ID and access token that are unique to my MapBox account, and that green map.

Replace the map ID and access token with your map ID from the map you just created and the access token from your MapBox account:

The map ID is located with the layer you created:

![project.png](https://github.com/willbreitkreutz/web_mapping_workshop/blob/gh-pages/img/project.png)

Your access token is located in the home page of your MapBox account in the right sidebar in a section that looks like this:

![access_token.png](https://github.com/willbreitkreutz/web_mapping_workshop/blob/gh-pages/img/access_token.png)

Copy each of these and replace the ones in `js/exercise_4.js`.

Go to your map link and check out your map, I'll bet it's looking better already!

We'll level up and add some Thematic data to the map in the next [exercise](https://github.com/willbreitkreutz/web_mapping_workshop/blob/gh-pages/exercise5_put_some_data_on_the_map.md)
