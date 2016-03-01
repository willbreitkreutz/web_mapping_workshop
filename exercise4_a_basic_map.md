# Exercise 4, A Basic Map

We've already looked at how GitHub lets us store code and publish web sites, now let's get rid of that ugly green map and publish a basic mapping site with the base map you created in the last exercise.

## Editor of the Day

Now you could download all of the code for the project to your local machine, make the edits and push it back to GitHub for deployment, that would work.  We're going to short cut that workflow and keep all of our work in the browser!

[Prose.io](http://www.prose.io) is an awesome little tool that lets you access and edit files hosted in GitHub.  It's designed for editing blog posts in [Markdown](https://en.wikipedia.org/wiki/Markdown), but works just as well for doing quick edits in your code.  I wouldn't use it for building a large application, but for the app we're putting together it will work beautifully.  You will need to authorize the Prose app using your GitHub account, but after that access is pretty seamless.

## Explore the Project

Since you forked my project, you now have a complete working copy of the ugly green map that I built out.  Check it out at

http://www. {your GitHub user name} .github.io/web_mapping_workshop/

Is the map a ugly shade of green?  Great!

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
<body>
```

The top part of the file, or the `<HEAD>` section contains links to all of the css and javascript libraries that the app needs to function, these are the 3rd party files that we're leveraging without having to write ourselves.



