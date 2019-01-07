var map = L.map('map-canvas').setView([-1.304137, 117.378671], 5);

var basemaps = [
    L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 20,
        minZoom: 0,
        label: 'Toner Lite'
    }),
    L.tileLayer('//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 20,
        minZoom: 0,
        label: 'Toner'
    }),
    L.tileLayer('//stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 20,
        minZoom: 0,
        label: 'Watercolor'
    })
];

map.addControl(L.control.basemaps({
    basemaps: basemaps,
    tileX: 0,
    tileY: 0,
    tileZ: 1
}));

L.control.scale().addTo(map);

var wa = L.geoJSON(mandailingnatal, {
	style: countriesStyle,
    onEachFeature: onEachFeature,
    filter: filterCountries,
}).addTo(map);
map.fitBounds(wa.getBounds());

function countriesStyle(feature) {
    return {
        fillColor: "#fff",
        fillOpacity: 0,
        color: '#fff',
        opacity: 0.8,
        weight: 1,
    }
}

function onEachFeature(feature, layer) {
    
    layer.bindTooltip(feature.properties.NAMOBJ, {permanent:true,direction:'center',className: 'countryLabel'});        
}

function filterCountries(feature, layer) {
    return feature.properties.name != 'Greenland';
}