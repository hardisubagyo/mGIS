var map = L.map('map-canvas').setView([-1.304137, 117.378671], 5);

var basemaps = [
    L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 20,
        minZoom: 0,
        label: 'Toner Lite'
    }),
    L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 20,
        minZoom: 0,
        label: 'OpenStreetMap Mapnik'
    }),
    L.tileLayer('//{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
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
var lyrProv;
var lyrKab;
var lyrPer = null;
var tipe;
var prov;
	
/*AWAL PENCARIAN BERDASARKAN WILAYAH*/
	function cariWilayah(){

		clean_map();

		$("#PencarianWilayah").modal('hide');
		var defaultParameters = {
	        service : 'WFS',
	        version: '1.0.0',
	        request: 'GetFeature',
	        typeName : 'mx:provinsi',
	        outputFormat: 'text/javascript',
	        format_options : 'callback:getJson',
			SrsName : 'EPSG:4326'
	    };
	    var parameters = L.Util.extend(defaultParameters);
		var URL = geoJsonUrl + L.Util.getParamString(parameters) + '&CQL_FILTER=id_prov=%27'+$('#Provinsi').val()+'%27';
		console.log(URL);
		var ajax = $.ajax({
			type: "GET",
			url : URL,
		    dataType : 'jsonp',
		    jsonpCallback : 'getJson',
		    async: false,
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
		   				layer.on('click', function(){
		   					var dataProv = new Array(features.properties.region, features.properties.provinsi);
		   					ShowData(dataProv);
		   				})
		            }
				}).addTo(map);
				map.fitBounds(lyrProv.getBounds());

				/*alert(map.getZoom());*/
				map.on('zoom', function(){
					/*alert("zoom - " + map.getZoom());*/

					if(map.getZoom() < 7){
						clean_map();
						mapProv($('#Provinsi').val());
					}

					if(map.getZoom() > 6){
						clean_map();
						mapKab($('#Provinsi').val());
					}

				});
			}
		});
		/*getZoom($('#Provinsi').val());*/

		/*prov = $('#Provinsi').val();*/

		//var zoom;

		/*if(tipe == 0){
			alert(tipe);
			zoom = 	setTimeout(
				map.on('zoomend', function(){
						clean_map();
						myZoomHandler($('#Provinsi').val());
				})
				,1);			
		}
		if(tipe == 1){
			alert(tipe);
			clearTimeout(zoom);
		}*/

		// myZoomHandler(prov);
		//myZoomHandler_v1(prov, 0);
		
		/*map.on('zoomend', function(){
			clean_map();
			myZoomHandler(prov);
		});*/


		/*$('select').prop('selectedIndex', 0);*/
	}

	function myZoomHandler() {

		clean_map();
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
	        	mapProv($('#Provinsi').val());
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
	        	mapKab($('#Provinsi').val());
	        	break;
	        default:
	        	break;
	    }
	}

	function myZoomHandler_v1(prov, tipe) {
		/*clean_map();
		console.log(tipe)
		var zoom;
		console.log(foo.bar);*/


		var zoom;

		if(tipe == 0){
			/*zoom = map.on('zoomend', function(){
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
			        	mapProv(prov);
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
			        	mapKab(prov);
			        	break;
			        default:
			        	break;
			    }
			});*/	
			zoom = "Harus nya kesini";

			return zoom;
		}

		if(tipe == 1){
			zoom = 1;

			return zoom;
		}
		
		console.log(zoom);
	}

	function getZoom(id_prov){
		clean_map();
		var defaultParameters = {
	        service : 'WFS',
	        version: '1.0.0',
	        request: 'GetFeature',
	        typeName : 'mx:provinsi',
	        outputFormat: 'text/javascript',
	        format_options : 'callback:getJson',
			SrsName : 'EPSG:4326'
	    };
	    var parameters = L.Util.extend(defaultParameters);
		var URL = geoJsonUrl + L.Util.getParamString(parameters) + '&CQL_FILTER=id_prov=%27'+id_prov+'%27';
		var ajax = $.ajax({
			type: "GET",
			url : URL,
		    dataType : 'jsonp',
		    jsonpCallback : 'getJson',
		    async: false,
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
		   				layer.on('click', function(){
		   					var dataProv = new Array(features.properties.region, features.properties.provinsi);
		   					ShowData(dataProv);
		   				})
		            }
				}).addTo(map);
				map.fitBounds(lyrProv.getBounds());

				/*alert(map.getZoom());*/
				map.on('zoom', function(){
					/*alert("zoom - " + map.getZoom());*/

					if(map.getZoom() < 7){
						clean_map();
						mapProv(id_prov);
					}

					if(map.getZoom() > 6){
						clean_map();
						mapKab(id_prov);
					}

				});
			}
		});

	}

	function mapProv(id_prov){
		
		var defaultParameters = {
	        service : 'WFS',
	        version: '1.0.0',
	        request: 'GetFeature',
	        typeName : 'mx:provinsi',
	        outputFormat: 'text/javascript',
	        format_options : 'callback:getJson',
			SrsName : 'EPSG:4326'
	    };
	    var parameters = L.Util.extend(defaultParameters);
		var URL = geoJsonUrl + L.Util.getParamString(parameters) + '&CQL_FILTER=id_prov=%27'+id_prov+'%27';
		var ajax = $.ajax({
			type: "GET",
			url : URL,
		    dataType : 'jsonp',
		    jsonpCallback : 'getJson',
		    async: false,
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
		   				layer.on('click', function(){
		   					var dataProv = new Array(features.properties.region, features.properties.provinsi);
		   					ShowData(dataProv);
		   				})
		            }
				}).addTo(map);
			}
		});
	}

	function mapKab(id_prov){
		var paramKab = {
	        service : 'WFS',
	        version: '1.0.0',
	        request: 'GetFeature',
	        typeName : 'mx:Kab_Kot',
	        outputFormat: 'text/javascript',
	        format_options : 'callback:getJson',
			SrsName : 'EPSG:4326'
	    };
	    var urlKab = L.Util.extend(paramKab);
		var URLkabupaten = geoJsonUrl + L.Util.getParamString(urlKab) + '&CQL_FILTER=kode_prov=%27'+id_prov+'%27';
		var ajax1 = $.ajax({
			url : URLkabupaten,
		    dataType : 'jsonp',
		    jsonpCallback : 'getJson',
		    async: false,
			success	: function(response){
				lyrKab = L.geoJson(response, {
					style: function(features){
						return{
					        weight: 2,
							opacity: 1,
							color: 'white',
							dashArray: '3',
							fillOpacity: 0.7,
							fillColor: getColor(features.properties.kode_prov)
						};
					},
					onEachFeature: function (features, layer) {
		                layer.on('click', function(){
		                	var dataKab = new Array(
		                		features.properties.PROVINSI,
		                		features.properties.KABKOT,
		                		features.properties.IdKab
		                	);
		                	ShowKabupaten(dataKab);
		                })
		            }
				}).addTo(map);
				/*map.fitBounds(lyrKab.getBounds());*/
			}
		});
	}

	function ShowData(data){
		$('#showDataProv').modal('show');

		$('#Region').html(data[0]);
		$('#Provinsi-Prov').html(data[1]);
	}

	function ShowKabupaten(data){
		$('#showDataKab').modal('show');

		$('#Provinsi-kab').html(data[0]);
		$('#KabKota').html(data[1]);
	}

/*AKHIR*/


/*AWAL PENCARIAN BERDASARKAN PERUSAHAAN*/
	function cariPerusahaan(){
		/*alert($('#Provinsi').empty());*/	
		/*tipe = 'Wilayah123';
		myZoomHandler(tipe,0);*/

		/*cariWilayah(1);*/

		/*var func;

		map.on('zoomend', function(){clean_map();});*/

		/*map.clearControls(map);*/

		/*prov = null;*/

		//myZoomHandler_v1(null, 2);

		//document.getElementById("Wilayah").reset();
		//$("#Provinsi")[0].reset();
		/*$('select').prop('selectedIndex', 0);*/

		$('#PencarianPerusahaan').modal('hide');
		clean_map();

		$.ajax({
		  	type : "get",
		  	data : { id : $('#Perusahaan').val() },
		  	url  : "getKabupaten",
		  	dataType : "json",
		  	success: function(responsePerusahaan){
		  		map.off('zoom');
		  		/*myZoomHandler_v1(null, 1);*/
		  		/*map.invalidateSize();*/
		  		/*if (map != undefined) {
				   map.remove();
				}*/

				//Use this after adding tile layer

				/*setTimeout(function () { map.invalidateSize() }, 1200);*/

				
		  		/*console.log(responsePerusahaan);*/
		  		GetNamaKab(responsePerusahaan, $('#Perusahaan').val());
		  		/*map.on('zoomend', function(){
					clean_map();
					GetNamaKab(responsePerusahaan, $('#Perusahaan').val());
				});*/
		    	/*GetNamaKab(responsePerusahaan, $('#Perusahaan').val());*/
		  	},
		  	error: function(error){
		  		console.log(error);
		  	}
		});
		return false;
	}

	function GetNamaKab(responsePerusahaan, idPerusahaan){
		var kab = "";
		var i;
		for(i = 0; i < responsePerusahaan.length; i++){
			kab += "'" + responsePerusahaan[i] + "'";
			if(i != responsePerusahaan.length-1){
				kab += ",";
			}else{

			}
		}
		
		/*console.log(param);*/
		var params = kab;
		var paramKab = {
	        service : 'WFS',
	        version: '1.0.0',
	        request: 'GetFeature',
	        typeName : 'mx:Kab_Kot',
	        outputFormat: 'text/javascript',
	        format_options : 'callback:getJson',
			SrsName : 'EPSG:4326'
	    };
	    var urlKab = L.Util.extend(paramKab);
		var URLkabupaten = geoJsonUrl + L.Util.getParamString(urlKab) + '&CQL_FILTER=IdKab IN ('+params+')';

		console.log(URLkabupaten);
		var ajax_perusahaan = $.ajax({
			url : URLkabupaten,
		    dataType : 'jsonp',
		    jsonpCallback : 'getJson',
			success	: function(response){
				lyrPer = L.geoJson(response, {
					style: function(features){
						return{
					        weight: 2,
							opacity: 1,
							color: 'white',
							dashArray: '3',
							fillOpacity: 0.7
						};
					},
					onEachFeature: function (features, layer) {
		                layer.on('click', function(){
		                	var IdKab = features.properties.IdKab;
		                	Showpopup(IdKab, idPerusahaan);
		                })
		            }
				}).addTo(map);
				map.fitBounds(lyrPer.getBounds());
				/*map.fitBounds(lyrProv.getBounds()); */
			}
		});
	}

	function Showpopup(IdKab, idPerusahaan){
		$.ajax({
		  	type : "get",
		  	data : { idKab : IdKab, idPer : idPerusahaan },
		  	url  : "getDataDetail",
		  	dataType : "json",
		  	success: function(response){
		  		console.log(response);
		  		
		  		$('#DataDetail').modal('show');

		  		$('#NamaPerusahaan').html(response.DataPerusahaan[0].Nama);
		  		$('#Alamat').html(response.DataPerusahaan[0].Alamat);
		  		$('#NoTelp').html(response.DataPerusahaan[0].NoTelp);

		  		$('#NamaKabupaten').html(response.DataKabupaten[0].Kabupaten);

		  	},
		  	error: function(error){
		  		console.log(error);
		  	}
		});
		return false;
	}
/*AKHIR PENCARIAN BERDASARKAN PERUSAHAAN*/

	function clean_map() {

	    map.eachLayer(function (layer) {
	        if (layer instanceof L.GeoJSON){
	            map.removeLayer(layer);
	        }
	    });
	}

	function getColor(d){
		return d < 20 ? '#800026' :
				'#FFEDA0';
	}

	function titleCase(str) {
	   	var splitStr = str.toLowerCase().split(' ');
	   	for (var i = 0; i < splitStr.length; i++) {
	    	splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	   	}
	   	return splitStr.join(' '); 
	}