$(document).ready(function() {
    doWork();

   // Event Listener
   $("#filter").on("click", function() {
    doWork2();
});

});



function doWork() {

    // Use this link to get the GeoJSON data.
    var url = "static/data/map10.json";

    // clear out the old map 
    $("#map-container").empty();
    $("#map-container").append('<div id="map" style="height:900px"></div>');

    requestD3(url);
}

function doWork2() {

    // Use this link to get the GeoJSON data.
    var url = "static/data/map10.json";

    // clear out the old map 
    $("#map-container").empty();
    $("#map-container").append('<div id="map" style="height:900px"></div>');

    requestD3b(url);
}



function requestD3(url) {
    d3.json(url).then(function(data) {
        console.log(data);
        createDropdown(data);
        createMap(data);
        console.log(data)
    });
}

function requestD3b(url) {
    d3.json(url).then(function(data) {
        console.log(data);
        // createDropdown(data);
        createMap(data);
        console.log(data)
    });
}

function createDropdown(data) {
    console.log(data)
    let race = data.map(d => d.race);
    race = new Set(race);
    race = [...race]
    console.log(race)
    for (let i = 0; i <race.length; i++) {
        let races = race[i];
        let html = `<option>${races}</option>`;
        $("#selDataset").append(html);
    }
}

function makeDashboard(data) {
    let id = $("#selDataset").val();
    
    createMap(data);
    
}



function createMap(data) {
    console.log(data)
    // MAPBOX BASE LAYERS
    var dark_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/dark-v10',
        accessToken: API_KEY
    });

    var light_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v10',
        accessToken: API_KEY
    });

    var street_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        accessToken: API_KEY
    });

    var outdoors_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/outdoors-v11',
        accessToken: API_KEY
    });


    // Create an overlays object.
    // var markers = [];
    var heatArray = [];
    // Loop through locations, and create the markers.
    
    
    var race_filter = $("#selDataset").val();
    var sub = data;
    if(race_filter!="All"){
        sub= data.filter(x=>x.race===race_filter);

        }
    console.log(data)
    var arrests =sub.map(d=>d.LAT);
    var arrests2 =sub.map(d=>d.LNG);
    for (let i = 0; i < sub.length; i++) {
        
        // lat=sub.map(d=>d.LAT);
        // lng=sub.map(d=>d.LNG);
        
        let arrests3 = arrests[i];
        let arrests4 = arrests2[i];
        // point2 = lat[i];
        // point3=lng[i];
        

        let coord = [arrests3, arrests4];
        // let coord2 = [point2, point3];
        

        // let marker = L.marker(coord2).bindPopup(point.descript);
        // markers.push(marker);

        // this is for heatmap
        heatArray.push(coord);
    }

    // LAYER GROUPS/LEGEND
    // var markerLayer = L.layerGroup(markers);
    var heatLayer = L.heatLayer(heatArray, {
        radius: 20,
        blur: 35
    });


    // Create a baseMaps object.
    var baseMaps = {
        "Dark": dark_layer,
        "Light": light_layer,
        "Street": street_layer,
        "Outdoors": outdoors_layer
    };

    // Overlays that can be toggled on or off
    var overlayMaps = {
        // Markers: markerLayer,
        HeatMap: heatLayer
    };

    // Create a new map.
    // Edit the code to add the earthquake data to the layers.
    var myMap = L.map("map", {
        center: [32.7767, -96.7970],
        zoom: 11,
        layers: [dark_layer, heatLayer]
    });

    // Create a layer control that contains our baseMaps.
    // Be sure to add an overlay Layer that contains the earthquake GeoJSON.
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

}
