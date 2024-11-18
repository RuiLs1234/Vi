const width = 800;
const height = 600;

const svg = d3.select("#map")
    .attr("width", width)
    .attr("height", height);

// Load the GeoJSON data from the external source
const geojsonUrl = "https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries/POR.geojson";

d3.json(geojsonUrl).then(data => {
    // Define a projection and path generator
    const projection = d3.geoMercator()
        .center([-8.5, 39.5]) // Center around Portugal
        .scale(100000) // Adjust scale
        .translate([width / 2, height / 2]); // Center in the SVG

    const path = d3.geoPath().projection(projection);

    // Create districts on the map
    svg.selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("class", "district")
        .attr("d", path)
        .on("click", (event, d) => {
            showPrices(d.properties.name); // Show district name on click
        });

    // Function to display district name
    function showPrices(districtName) {
        d3.select("#chart").html(`Showing prices for: <strong>${districtName}</strong>`);
    }
}).catch(error => {
    console.error("Error loading GeoJSON:", error);
});