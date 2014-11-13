//  -> Shoot geoJSON to a github gist from the NSI application

$.ajax({
  url:'https://api.github.com/gists',
  method:'POST',
  contentType:'application/json; charset=utf-8',
  dataType: 'json',
  data: JSON.stringify({
    description: 'shapefile from the NSI tool',
    public: true,
    files: {
      'file.geojson': { content: JSON.stringify(shapeLayer.toGeoJSON()) }
    }
  }),
  success:function(data){
    var url = data.html_url;
    if(confirm('the data has been transfered to a gist at this url: ' + url + ' would you like to go there now?')) window.open(url);
  }
});
