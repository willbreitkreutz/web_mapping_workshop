# Exercise 6, Adding Basic Popups

Ok, data on the map is cool, but how about we make it a little more interactive by adding popups when you click on a feature.

This is actually pretty easy since our mapping library has popups built in.

We just need to add the following bit of JS code:

```javascript
featureLayer.on('ready', function(){
  this.eachLayer(function(layer){
    layer.bindPopup('Welcome to ' + layer.feature.properties.LABEL);
  });
});
```

This adds another callback to run when the featureLayer is ready to go, this function loops through each feature, called a 'layer' in the code and adds a popup that presents the user with the name of the park they clicked on.  If you chose to use a different layer you will need to edit the popup contents to reference valid data from that layer.

Once you get the popups working and showing your users some useful information we can move to the next [exercise](https://github.com/willbreitkreutz/web_mapping_workshop/blob/gh-pages/exercise7_fancy_click_handling.md.md)
