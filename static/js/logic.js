// save queryURL
let queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Perform a GET request to the query URL.
d3.json(queryUrl).then((data) => {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    //Create the data marker layer
    let earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function (feature, latlng) {
            //Isolate the magnitude and depth data from the json
            let depth = feature.geometry.coordinates[2];
            let mag = feature.properties.mag;
            let color = 'black';
            let fillColor = getColor(depth);
            let size = mag*40000;


            var geojsonMarkerOptions = {
                radius: size,
                color: color,
                weight : 1,
                fillColor : fillColor,
                fillOpacity : .8
            };
            return L.circle(latlng, geojsonMarkerOptions)
        }
    })
    createMap(earthquakes);
}

function getColor(depth) {
    if (depth > 90) {
        return 'red'  
    }
    else if (depth > 70) {
        return 'orange'
    }
    else if (depth > 50) {
        return 'yellow'
    }
    else if (depth > 30) {
        return 'green'
    }
    else if (depth > 10) {
        return 'blue'
    }
    else return 'purple'
}



function createMap(earthquake) {
    // Create a map object.
    let myMap = L.map("map", {
        center: [15.5994, -28.6731],
        zoom: 3,
        layers: [earthquake]
    });

    // Add a tile layer.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [-10, 10, 30, 50, 70, 90]
    

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);

}

