var shapeLayer;
shapeLayer = L.geoJson().addTo(map);

$('body').on('keyup',function(e){
    if(e.ctrlKey && e.altKey && e.keyCode === 83){
        enableShapfileTool();
    }
});

//Ok, I stole some code to make the map drag and drop enabled too...
var mapframe = document.getElementById('map');
var dropbox = document.getElementById("drag-overlay");
mapframe.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragenter", dropdragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);
dropbox.addEventListener("dragleave", function() {
    map.scrollWheelZoom.enable();
    $('#drag-overlay').hide();
}, false);

function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
    map.scrollWheelZoom.disable();
    $('#drag-overlay').show();
}

function dropdragenter(e) {
    e.stopPropagation();
    e.preventDefault();
}

function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}

function drop(e) {
    e.stopPropagation();
    e.preventDefault();
    map.scrollWheelZoom.enable();
    $('#drag-overlay').hide();
    var dt = e.dataTransfer;
    var files = dt.files;

    var i = 0;
    var len = files.length;
    if (!len) {
        return
    }
    while (i < len) {
        handleFile(files[i]);
        i++;
    }
}

function enableShapfileTool(){

    var AddShapefileControl = L.Control.extend({
        options: {
            position: 'bottomleft'
        },

        onAdd: function(map) {
            this._container = L.DomUtil.create('div', 'nsi-control-query leaflet-bar leaflet-control');
            this._input = L.DomUtil.create('input','hide-input',this._container);
            this._input.type = 'file';
            this._input.id = 'input';

            this._button = L.DomUtil.create('a','leaflet-bar-single',this._container);
            this._button.title = 'Add a shapefile to the map';

            L.DomEvent
                    .on(this._input, 'change', this._queryShapefile, this)
                    .on(this._button, 'click', L.DomEvent.stopPropagation)
                    .on(this._button, 'click', L.DomEvent.preventDefault)
                    .on(this._button, 'click', this._fireInput, this);

            return this._container;
        },

        _queryShapefile: function(){
            var file = document.getElementById('input').files[0];
            handleFile(file);
        },
        _fireInput:function(){
            this._input.click();
        }
    });

    var ShootShapefileControl = L.Control.extend({
        options: {
            position: 'bottomleft'
        },

        onAdd: function(map) {
            this._container = L.DomUtil.create('div', 'nsi-control-query-shape leaflet-bar leaflet-control');
            this._button = L.DomUtil.create('a','leaflet-bar-single',this._container);
            this._button.title = 'Shoot your shapefile to a gist';

            L.DomEvent
                    .on(this._button, 'click', L.DomEvent.stopPropagation)
                    .on(this._button, 'click', L.DomEvent.preventDefault)
                    .on(this._button, 'click', this._fireData, this);

            return this._container;
        },

        _fireData: function(){
            //  -> Shoot geoJSON to a github gist based on the code from the  NSI application
          map.spin(true);
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
              map.spin(false);
              var url = data.html_url;
              if(confirm('the data has been transfered to a gist at this url: ' + url + ' would you like to go there now?')) window.open(url);
            }
          });
        }
    });

    map.addControl(new AddShapefileControl());
    map.addControl(new ShootShapefileControl());

}

function handleFile(file) {
    shapeLayer.clearLayers(); // remove any existing data -> comment out to allow multiple shapefiles

    map.spin(true);
    var reader = new FileReader();

    if (file.name.slice(-3) === 'zip') {
        var reader = new FileReader();
        reader.onload = function(){
            if(reader.readyState !==2 || this.error){
                return;
            }else{
                shp(reader.result).then(function(geoJson){

                    map.spin(false);
                    shapeLayer.addData(geoJson,{
                        filter:function(feature,layer){
                            if(feature.geometry.coordinates[0].length>1000){
                                return true;
                            }
                        }
                    });

                    window.setTimeout(function(){
                        map.fitBounds(shapeLayer.getBounds())
                    },50);

                },function(e){
                    map.spin(false);
                    console.log('Error: ', e);
                });
            }
        };
        reader.readAsArrayBuffer(file);
    }else{
        return undefined;
    }
}
