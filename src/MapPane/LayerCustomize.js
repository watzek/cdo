/*
So basically I made this file because I knew that customizing each of the layers
within the leaflet map would require a lot of code, I housed it in
this js file, from which functions are exported allowing them
to be imported by mappane.js without compromizing the organization of
mappane.js which is arguably the most central component of this project.

it imports leaflet in order to be able to use its functions and objects
within the customization. Notice it does not import react-leaflet, as this
file could almost function independently from React because we need to
expose a great deal of the underlying leaflet code to be able to customize
things.
React-leaflet is a very surface level framework with which you can't accomplish
many things without working under the hood a bit.
*/
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet';

/*
 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
   integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
   crossorigin=""/>
   */

const categories = [
	'Geographic Feature',
	'Key Events',
	'Native American Encounter',
	'Important Campsite',
	'Natural History'
];

const marker_colors = [
	'icon_red.png',
	'icon_green.png',
	'icon_blue.png',
	'icon_orange.png',
	'icon_brown.png',
	'icon_none.svg',
	'map_marker_icon.png'
];

export function LayerStyle(name, cntxt) {
	context = cntxt;
	switch (name) {
		case 'biomes':
			return biomeStyle;
		case 'retpoi':
		case 'outpoi':
			return POIStyle;
		case 'trail':
			return trailStyle;
		case '1803':
			return style1803;
		case 'selected_rivers':
			return styleRiv;
		default:
			return null;
	}
}

var context = null; // augment scope of context

export function OnEachFeature(name, cntxt) {
	context = cntxt;

	/*
	cntxt.refs.map.on({
		  zoomstart: () => {
		console.log('yo')
	  }
	});
	*/

	switch (name) {
		case 'biomes':
			return onEachBiome;
		case 'retpoi':
		case 'outpoi':
			return onEachPOI;
		case 'trail':
			return onEachTrail;
		case 'tribe':
			return onEachTribe;
		case 'tribes':
			return onEachTribe2;
		case '1803':
			return onPolitical;
		case 'selected_rivers':
			return onRiv;
		default:
			return null;
	}
}


export function PointToLayer(name, cntxt) {
	context = cntxt;
	switch (name) {
		case 'retpoi':
			return pointToPOI;
		case 'outpoi':
			return pointToPOI;
		case 'tribe':
			return pointToTribes;
		case 'tribes':
			return pointToTribes2;
		default:
			return null;
	}
}

function styleRiv(feature, layer) {
	var color = '#ffa500';
	if (feature.properties.BANK === 0)
		color = '#FFA500';
	return { fillColor: color, fillOpacity: 0.8 };
}

function onRiv(feature, layer) {
	layer.bindPopup(feature.properties.NAME);
}


function style1803(feature, layer) {
	var color = '#000000';
	if (feature.properties.id === 1)
		color = '#00008B';
	if (feature.properties.id === 2)
		color = '#FFFF00';
	if (feature.properties.id === 3)
		color = '#FFFF00';
	if (feature.properties.id === 4)
		color = '#FF0000';

	if (feature.properties.id === 5)
		color = '#4682B4';

	return { fillColor: color, fillOpacity: 0.4, stroke: false };
}

function onPolitical(feature, layer) {
	layer.bindPopup(feature.properties.NAME, { closeOnClick: false });
}

//old version
/*
function onPolitical(feature, layer){
	layer.bindTooltip(feature.properties.NAME, {permanent: true});
}
*/

function pointToTribes(feature, latlng) {
	var color = 'icon_none.svg';
/*	var color = 'map-marker-icon-gray.png';
	if (feature.properties.major === 1) {
		color = 'map-marker-icon.png';
	}
*/
	const teardrop = Leaflet.icon({
		iconUrl: color,
		iconSize: [20, 20],
		iconAnchor: [19, 35]
	});

	const geojsonMarkerOptions = {
		icon: teardrop,
		zIndexOffset: 10000


	};
	return Leaflet.marker(latlng, geojsonMarkerOptions);
}


function pointToTribes2(feature, latlng) {
	var color = 'icon_none.svg';
/*	var color = 'map-marker-icon.png';
	//if (feature.properties.major === 1) {
	//	color = 'map-marker-icon.png';
	//}
*/
	const teardrop = Leaflet.icon({
		iconUrl: color,
		iconSize: [20, 20],
		iconAnchor: [19, 35]
	});

	const geojsonMarkerOptions = {
		icon: teardrop,
		zIndexOffset: 10000


	};
	return Leaflet.marker(latlng, geojsonMarkerOptions);
}


function pointToPOI(feature, latlng) {
	var color = marker_colors[categories.indexOf(feature.properties.Category[0])];
	if (!color) color = 'map-marker-icon.png';

	const teardrop = Leaflet.icon({
		iconUrl: color,
		iconSize: [26, 39], // size of the icon
		iconAnchor: [13, 39], // point of the icon which will correspond to marker's location
		tooltipAnchor: [7, -15]
	});

	const geojsonMarkerOptions = {
		icon: teardrop,
		zIndexOffset: 10000
		//title:feature.properties.Name
	};
	return Leaflet.marker(latlng, geojsonMarkerOptions); //.bindTooltip(feature.properties.Name)
}

//unused for now
/*
function pointToCities(feature, latlng) {
	return new Leaflet.Marker(latlng, {
		icon: new Leaflet.DivIcon({
			className: 'my-div-icon',
			html: '<span>' + feature.properties.CITY_NAME + '</span>'
		})
	});
}
*/

function POIStyle(feature) {
	return { opacity: 0 };

}

function trailStyle(feature) {
	if (feature.properties.JOURNEY === 'OUTBOUND')
		return {
			color: '#0000ff',
			opacity: context.props.activeTrail === 'outbound' ? 1 : 0
		};
	if (feature.properties.JOURNEY === 'RETURN')
		return {
			color: '#ff0000',
			opacity: context.props.activeTrail === 'return' ? 1 : 0
		};
	if (feature.properties.JOURNEY === 'OUTBOUND AND RETURN')
		return {
			color: context.props.activeTrail === 'outbound' ? '#0000ff' : '#ff0000'
		};
}

function biomeStyle(feature) {
	//let biomes_color = biomes => ('#'+(10*biomes).toString(16)+(25*biomes).toString(16)+(10*biomes).toString(16))
	var color = '#000000';
	if (
		feature.properties.ECO_NAME.indexOf('forest') >= 0 ||
		feature.properties.ECO_NAME.indexOf('pine') >= 0 ||
		feature.properties.ECO_NAME.indexOf('everglades') >= 0
	)
		color = '#11dd11';
	if (
		feature.properties.ECO_NAME.indexOf('shrub') >= 0 ||
		feature.properties.ECO_NAME.indexOf('steppe') >= 0 ||
		feature.properties.ECO_NAME.indexOf('chaparral') >= 0
	)
		color = '#fcea9c';
	if (
		feature.properties.ECO_NAME.indexOf('grassland') >= 0 ||
		feature.properties.ECO_NAME.indexOf('prairies') >= 0 ||
		feature.properties.ECO_NAME.indexOf('savanna') >= 0
	)
		color = '#aae570';
	if (
		feature.properties.ECO_NAME.indexOf('desert') >= 0 ||
		feature.properties.ECO_NAME.indexOf('mezquital') >= 0
	)
		color = '#f2f4c8';
	return { fillColor: color, fillOpacity: 0.3, stroke: false };
}

//function nncStyle(feature, layer){}


function onEachBiome(feature, layer) {
	layer.bindPopup(feature.properties.ECO_NAME, { permanent: true });
}

function onEachPOI(feature, layer) {
	//console.log(layer);
	layer.on({
		click: () => {
			//bind active layer here???
			context.props.changePane('info', feature.properties);
			layer.bindTooltip(feature.properties.Name, { permanent: true });
		},
		add: () => {
			//console.log("help");
		}
	});

}

//building block of future tour feature...gets a feature and goes to it and opens the info pane
export function goToPOI(feature, oldLayer, layer, context) {
	context.props.changePane('info', feature.properties);

	const latOffset = -1.4;
	const ll = Leaflet.GeoJSON.coordsToLatLng([
		feature.geometry.coordinates[0] + latOffset,
		feature.geometry.coordinates[1]
	]);

	context.state.map.setView(ll, 7);

	if (oldLayer != null) oldLayer.unbindTooltip();
	layer.bindTooltip(feature.properties.Name, { permanent: true }); //having trouble here...
}
function onEachTribe(feature, layer) {
	var tribeName = "" + feature.properties.Tribe;
	if (feature.properties.major === 1) {
		layer.bindTooltip(tribeName, { permanent: true, className: 'tribeMarker', offset: Leaflet.point(-12,-12), direction:'right',})
	}
	else {
		layer.bindTooltip(tribeName, { permanent: true, className: 'tribeMarker2', offset: Leaflet.point(-12,-12), direction:'right',})
	}
}


function onEachTribe2(feature, layer) {
	var tribeName = "" + feature.properties.Tribe;
	
	layer.bindTooltip(tribeName, { permanent: true, className: 'tribeMarker', offset: Leaflet.point(-12,-12), direction:'right',interactive: true,})

	//console.log(layer);
	layer.on({
		click: () => {
			//bind active layer here???
			context.props.changeTribe('tribeInfo', feature.properties);
			//layer.bindTooltip(feature.properties.Tribe, { permanent: true });
		},
		add: () => {
			//console.log("help");
		}
	});
}

function onEachTrail(feature, layer) {
	//layer.on({click: ()=>(console.log(feature.properties))})
}
