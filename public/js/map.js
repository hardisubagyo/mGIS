var map = L.map('map-canvas').setView([-1.304137, 117.378671], 5);

/*var basemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);*/

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

var geoJsonUrl ='http://localhost:8080/geoserver/mx/ows'; 
var lyrProv = null;
var lyrKab = null;

$('#btn_cari_provinsi').on('click',function(){
	clean_map();

	/*var provinsi = $('#Provinsi').val();*/
	$("#PencarianWilayah").modal('hide');
		
	myZoomHandler($('#Provinsi').val());

	map.on('zoomend', function(){

		//alert(provinsi);
		clean_map();
		myZoomHandler($('#Provinsi').val());
	});
});

function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}

function clean_map() {
    map.eachLayer(function (layer) {
        if (layer instanceof L.GeoJSON){
            map.removeLayer(layer);
        }
        console.log(layer);
    });
}

function myZoomHandler(provinsi) {
    var currentZoom = map.getZoom();
    switch (currentZoom) {
    	case 1:
    	case 2:
    	case 3:
    	case 4:
    	case 5:
        case 6:
        case 7:
        	clean_map();
        	mapProv(provinsi);
        	break;
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        	clean_map();
        	mapKab(provinsi);
        	break;
        default:
        	break;
    }
}

function getColor(d){
	return d < 20 ? '#800026' :
			'#FFEDA0';
}

function mapProv(provinsi){
	
	var defaultParameters = {
        service : 'WFS',
        version: '1.0.0',
        request: 'GetFeature',
        typeName : 'mx:INDONESIA_PROP',
        outputFormat: 'text/javascript',
        format_options : 'callback:getJson',
		SrsName : 'EPSG:4326'
    };
    var parameters = L.Util.extend(defaultParameters);
	var URL = geoJsonUrl + L.Util.getParamString(parameters) + '&CQL_FILTER=Propinsi=%27'+provinsi.toUpperCase()+'%27';
	var ajax = $.ajax({
		type: "GET",
		url : URL,
	    dataType : 'jsonp',
	    jsonpCallback : 'getJson',
		success	: function(response){
			lyrProv = L.geoJson(response, {
				style: function(features){
					return{
				        weight: 2,
				        opacity: 1,
				        color: 'white',
				        fillOpacity: 0
					};
				},
				onEachFeature: function (features, layer) {
	                layer.bindPopup("<div class='mygrid-wrapper-div'>"+
	                	"<table class='table'> "+ 
	                	"<thead>"+
	                		"<tr>"+
	                			"<th scope='col'>ID</th>"+
	                			"<th scope='col'>Kode</th>"+
	                			"<th scope='col'>Provinsi</th>"+
	                			"<th scope='col'>Sumber</th>"+
	                		"</tr>"+
	                	"</thead>"+
	                	"<tbody>"+
						    "<tr>"+
						      "<th scope='row'>"+features.properties.ID+"</th>"+
						      "<td>"+features.properties.kode+"</td>"+
						      "<td>"+features.properties.Propinsi+"</td>"+
						      "<td>"+features.properties.SUMBER+"</td>"+
						    "</tr>"+
						  "</tbody>"+
	                	"</table></div>");
	            }
			}).addTo(map);
			console.log(response);
		}
	});

}

function mapKab(provinsi){
	/*map.eachLayer(function (layer) {
	    map.removeLayer(layer)
	}); 
	basemap.addTo(map);*/
	var paramKab = {
        service : 'WFS',
        version: '1.0.0',
        request: 'GetFeature',
        typeName : 'mx:INDONESIA_KAB',
        outputFormat: 'text/javascript',
        format_options : 'callback:getJson',
		SrsName : 'EPSG:4326'
    };
    var urlKab = L.Util.extend(paramKab);
	var URLkabupaten = geoJsonUrl + L.Util.getParamString(urlKab) + '&CQL_FILTER=Provinsi=%27'+titleCase(provinsi)+'%27';
	var ajax1 = $.ajax({
		url : URLkabupaten,
	    dataType : 'jsonp',
	    jsonpCallback : 'getJson',
		success	: function(response){
			lyrKab = L.geoJson(response, {
				style: function(features){
					return{
						/*fillColor: 'blue',
				        weight: 2,
				        opacity: 1,
				        color: 'white',
				        fillOpacity: 0*/
				        weight: 2,
						opacity: 1,
						color: 'white',
						dashArray: '3',
						fillOpacity: 0.7,
						fillColor: getColor(features.properties.ID)
					};
				},
				onEachFeature: function (features, layer) {
	                layer.bindPopup("<div class='mygrid-wrapper-div'>"+
	                	"<table class='table'> "+ 
	                	"<thead>"+
	                		"<tr>"+
	                			"<th scope='col'>ID</th>"+
	                			"<th scope='col'>Kode</th>"+
	                			"<th scope='col'>Kabupaten</th>"+
	                			"<th scope='col'>Ibukota</th>"+
	                			"<th scope='col'>Provinsi</th>"+
	                			"<th scope='col'>Bupati/Walikota</th>"+
	                			"<th scope='col'>Wakil</th>"+
	                			"<th scope='col'>Batas Utara</th>"+
	                			"<th scope='col'>Batas Selatan</th>"+
	                			"<th scope='col'>Batas Barat</th>"+
	                			"<th scope='col'>Batas Timur</th>"+
	                		"</tr>"+
	                	"</thead>"+
	                	"<tbody>"+
						    "<tr>"+
						      "<th scope='row'>"+features.properties.ID+"</th>"+
						      "<td'>"+features.properties.kode+"</td>"+
						      "<td>"+features.properties.Kabupaten_+"</td>"+
						      "<td>"+features.properties.Ibukota+"</td>"+
						      "<td>"+features.properties.Provinsi+"</td>"+
						      "<td>"+features.properties.Bupati_Wal+"</td>"+
						      "<td>"+features.properties.Wakil+"</td>"+
						      "<td>"+features.properties.Batas_Utar+"</td>"+
						      "<td>"+features.properties.Batas_Sela+"</td>"+
						      "<td>"+features.properties.Batas_Bara+"</td>"+
						      "<td>"+features.properties.Batas_Timu+"</td>"+
						    "</tr>"+
						  "</tbody>"+
	                	"</table></div>");
	            }
			}).addTo(map);
			console.log(response);
		}
	});
}


/*
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map){
	var div = L.DomUtil.create('div', 'info legend'),
		grades = [20],
		labels = [],
		from, to;

	for (var i = 0; i < grades.length; i++) {
		from = grades[i];
		to = grades[i + 1];

		labels.push(
			'<i style="background:' + getColor(from + 1) + '"></i> ' +
			from + (to ? '&ndash;' + to : '+'));
	}

	div.innerHTML = labels.join('<br>');
	return div;
}

legend.addTo(map);*/