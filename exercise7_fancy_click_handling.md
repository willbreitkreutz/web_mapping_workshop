# Exercise 7, Fancy Click Handling

Popups are cool, but what if we want a little more professional looking interaction when users click on our data?

I've snuck in a panel that's been invisible so far that overlays on top of the map at the right side, we're going to put our data in that panel instead of in the popup when the user clicks on a feature.

If you look at `index.html` you'll see right next to the `<div>` called 'map' there's a `<div>` with the ID of 'info', that's our overlay.  We've also included a little css to position and style it to our liking:

```css
#info {
      position:absolute; top: 10px; right: 10px; bottom: 10px; width: 260px;
      background:#333; color: #fff;
      padding:20px;
      font-family: Arial, Helvetica, sans-serif;
      opacity:0.9;
	  filter:alpha(opacity=80); /* For IE8 and earlier */
}
```
## Clean up from earlier

Unless we want popups _and_ the overlay box, we should either delete or comment out the first click handler that we added to our layer in the last exercise:

```javascript
//featureLayer.on('ready', function(){
//  this.eachLayer(function(layer){
//    layer.bindPopup('Welcome to ' + layer.feature.properties.LABEL);
//  });
//});
```

Rather than use the out-of-the-box popup binding, we're going to write a little more code to handle the click ourselves.

Start by adding a click handler function that takes the click event as a variable called 'e':

```javascript
var clickHandler = function(e){

};
```

When the user clicks on a new feature we want to make sure any old data is removed, we're going to use [jQuery](https://jquery.com/) to do any of the actual DOM interaction because they make it super easy.  Everywhere you see a `$` we're using the jQuery library.

Using the jQuery selector for any node with the ID of 'info' we make sure to remove any child elements.

```javascript
var clickHandler = function(e){
	$('#info').empty();
};
```

Now we want to get a reference to the feature that the user clicked on.  Lucky for us, the click event `e` references the target of the click and we can access the feature object from there and assign it to a variable called `feature`:

```javascript
var clickHandler = function(e){
	$('#info').empty();

    var feature = e.target.feature;
};
```

Now we can show our info element and add text from the attributes of our feature. jQuery lets us fade an element in over time to make it a little more pleasing of an interaction so rather than just use the `.show()` function, we'll use `.fadeIn()` to make it appear in 400 milliseconds.

```javascript
var clickHandler = function(e){
	$('#info').empty();

    var feature = e.target.feature;

    $('#info').fadeIn(400, function(){

    }
};
```

The `.fadeIn()` function allows us to provide a callback that we can use to add elements to the panel once it's ready.  We're going to create a string variable and populate it using properties from our feature, if you used a dataset other than parks.geojson the feature names will need to be changed.

```javascript
var clickHandler = function(e){
  $('#info').empty();

  var feature = e.target.feature;

  $('#info').fadeIn(400,function(){
    var info = '';

    info += '<div>'
    info +=   '<h2>' + feature.properties.LABEL + '</h2>'
    info +=   '<p>'  + feature.properties.LOCATION + '</p>'
    info += '</div>'

    $('#info').append(info);
  });
};
```

As the last step we append the string content to our info panel using the `.append()` function.

To register our click handler so that it is actually called when a user clicks on a feature we're going to add a listener to the click event on each of the features in our featureLayer once it's been fully registered.

```javascript
var clickHandler = function(e){
  $('#info').empty();

  var feature = e.target.feature;

  $('#info').fadeIn(400,function(){
    var info = '';

    info += '<div>'
    info +=   '<h2>' + feature.properties.LABEL + '</h2>'
    info +=   '<p>'  + feature.properties.LOCATION + '</p>'
    info += '</div>'

    $('#info').append(info);
  });
};

featureLayer.on('ready', function(){
  this.eachLayer(function(layer){
    layer.on('click', clickHandler);
  });
});
```

Nice!  Now we have an overlay that is populated with properties from the feature that the user clicked on, how do we get rid of it when we're done?

We need to add on more little bit of code so that the info panel is hidden when a user clicks anywhere else on the map so that it can be dismissed by fading it out and emptying it of any content.

```javascript
var clickHandler = function(e){
  $('#info').empty();

  var feature = e.target.feature;

  $('#info').fadeIn(400,function(){
    var info = '';

    info += '<div>'
    info +=   '<h2>' + feature.properties.LABEL + '</h2>'
    info +=   '<p>'  + feature.properties.LOCATION + '</p>'
    info += '</div>'

    $('#info').append(info);
  });
};

featureLayer.on('ready', function(){
  this.eachLayer(function(layer){
    layer.on('click', clickHandler);
  });
});

map.on('click',function(e){
	$('#info').fadeOut(200);
    $('#info').empty();
});
```

## Web Map Success!!

Let's have some more fun, how about putting a point on the map based on our users location?  If you've got time, check out [exercise 8](/exercise8_bonus_locate_me.md)
