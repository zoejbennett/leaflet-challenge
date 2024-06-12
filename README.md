# leaflet-challenge

This project utilizes data derived from the United States Geological Servey to create a map that visualizes earthquake data over the last 7 days (05.13-05.19)

<img width="992" alt="Screenshot 2024-06-11 at 11 39 27 AM" src="https://github.com/zoejbennett/leaflet-challenge/assets/157840347/be28cf76-9919-4f53-93c1-b8ded472be6c">

The app first pulls GeoJson data from the USGS data feed into the code using the D3 library. Data markers are created through isolating the depth, magnitude and location information. The magnitude of the earthquake is visualized through the sizes of the markers, while the depths are shown through color, as described by the legend in the lower right corner. When each data point is clicked, the app displays the depth and magnitude measurements for each earthquake location.
The configurement of the map is created in the logic.js file. The display and legend are configured in the style.css file.

(https://zoejbennett.github.io/leaflet-challenge/)

I utilized the leaflet documentation and Xpert Learning assistant in completing this project.
