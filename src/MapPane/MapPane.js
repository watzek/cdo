/*
This js file is the centerpiece of the code. It contains the code for the
actual map pane, which holds a leaflet map and imports all of the layers and
also interacts with the other components of the application via props that it
has been passed.
*/

import * as React from 'react';
//import Control from 'react-leaflet-control';
import {
	Map as LMap,
	ZoomControl,
	TileLayer,
	GeoJSON,
	LayersControl,
	LayerGroup,
} from 'react-leaflet';
import './MapPane.css';
import MapLegend from './MapLegend';
import { LayerStyle, OnEachFeature, PointToLayer, goToPOI } from './LayerCustomize.js';
import MinZoom from './MinZoom.js';

export default class MapPane extends React.Component {
	constructor(props) {
		super(props);
		this.closeSidebar = this.closeSidebar.bind(this);
		this.closeSidebarTribe = this.closeSidebarTribe.bind(this);


	}

	state = {
		overlays: new Map(),
		out: new Map(),
		ret: new Map(),
		tribes: new Map(),
		map: null,
		activeWaypoint: 0,
		popIsOpen: false
	};

	componentDidMount() {
		this.loadJSONLayer('biomes', { alias: 'Biomes' });
		this.loadJSONLayer('tribe', { alias: 'Tribes' });
		this.loadJSONLayer('1803', { alias: '1803 Political Map' });
		this.loadJSONLayer('selected_rivers', { alias: 'Rivers' });
		this.loadJSONLayer('rettrail', { alias: 'Return', journey: 'ret' });
		this.loadJSONLayer('outtrail', { alias: 'Outbound', journey: 'out' });
		this.loadAirLayer('filterByFormula=FIND("inbound", {Trip%20Portion})', 'outpoi', { alias: 'Outbound', journey: 'out' });
		this.loadAirLayer('filterByFormula=FIND("outbound", {Trip%20Portion})', 'retpoi', { alias: 'Return', journey: 'ret' });
		this.loadTribeLayer('filterByFormula=FIND("yes", {Profile})', 'tribes', { alias: 'tribes', journey: 'tribes' });
		this.setState({ map: this.refs.map.leafletElement });


		//warning: this may cause unintended troubles with popups randomly closing
		//I tried to make it only close waypoints

		this.refs.map.leafletElement.on('preclick', function (e) {
			var mapCopy = this;
			this.eachLayer(function (layer) {
				if (layer.options.pane === "tooltipPane" && ("Category" in layer['_source'].feature.properties)) {
					layer.removeFrom(mapCopy);
				}

			});
		});

	}
	//&& ("Category" in layer['_source'].feature.properties)

	//takes care of handling next and previous buttons
	componentDidUpdate(oldProps) {
		if (this.props.nextPoint !== oldProps.nextPoint) {
			var next = this.props.nextPoint; //get feature with this ID...
			var last = oldProps.nextPoint;
			var sz = this.state.out.get("outpoi").data.features.length;
			//var feature = this.state.ret.get("retpoi").data.features[next - sz];
			//feature is the BIG hangup,,,,,

			var key, feature, pointT = null, pointO = null;
			for (key in this.state.map["_layers"]) {
				if (this.state.map["_layers"][key].hasOwnProperty("feature") && "WaypointID" in this.state.map["_layers"][key].feature.properties) {
					if (this.state.map["_layers"][key].feature.properties.WaypointID === next) {



						pointT = this.state.map["_layers"][key];
					}
					if (this.state.map["_layers"][key].feature.properties.WaypointID === last) {
						pointO = this.state.map["_layers"][key];
					}
				}
			}


			//console.log(this.state.out.get("outpoi").data.features[sz - 1]);

			if (next >= sz) feature = this.state.ret.get("retpoi").data.features[next - sz - 1];
			else feature = this.state.out.get("outpoi").data.features[next - 1];

			console.log(next + " " + sz + pointO + pointT);
			console.log(feature);

			if (pointT !== null && feature !== undefined) {
				goToPOI(feature, pointO, pointT, this);
			}

		}
	}

	loadAirLayer(query, name, options) {
		const url = 'https://api.airtable.com/v0/appNr9GTJe3BAOfph/Table%201?view=Grid%20view&' + query + '&sort=';
		const key = 'keybBOS8YIIJjXE8u';

		var geo = {};
		geo.type = "FeatureCollection";
		geo.crs = { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } };
		geo.features = [];

		//works but causes an eslint error due to unused variable
		// eslint-disable-next-line
		const resp = fetch(url, {
			headers: {
				Authorization: `Bearer ${key}`
			}
		}).then(resp => {
			resp.json().then(json => {
				for (var i = 0; i < json.records.length; i++) {
					var geoPoint = {};
					var obj = json.records[i];

					geoPoint.type = "Feature";
					geoPoint.properties = obj.fields;
					geoPoint.geometry = {
						"type": "Point",
						"coordinates": [obj.fields.longitude, obj.fields.latitude]
					};

					if (obj.fields.latitude !== undefined && obj.fields.longitude !== undefined) {
						geo.features.push(geoPoint);
					}
				}

				let params = {
					data: geo,
					alias: options.alias,
					type: options.type,
					journey: options.journey
				};
				console.log(geo);
				switch (options.journey) {
					case 'ret':
						this.setState({ ret: this.state.ret.set(name, params) });
						break;
					case 'out':
						this.setState({ out: this.state.out.set(name, params) });
						break;
					default:
						this.setState({ overlays: this.state.overlays.set(name, params) });
						break;
				}
			});
		});
	}
	loadTribeLayer(query, name, options) {
		const url = 'https://api.airtable.com/v0/appNr9GTJe3BAOfph/Table%202?maxRecords=50&view=Grid%20view&' + query + '&sort=';
		const key = 'keybBOS8YIIJjXE8u';

		var geo = {};
		geo.type = "FeatureCollection";
		geo.crs = { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } };
		geo.features = [];

		//works but causes an eslint error due to unused variable
		// eslint-disable-next-line
		const resp = fetch(url, {
			headers: {
				Authorization: `Bearer ${key}`
			}
		}).then(resp => {
			resp.json().then(json => {
				for (var i = 0; i < json.records.length; i++) {
					var geoPoint = {};
					var obj = json.records[i];

					geoPoint.type = "Feature";
					geoPoint.properties = obj.fields;
					console.log(geoPoint.properties);
					geoPoint.geometry = {
						"type": "Point",
						"coordinates": [obj.fields.longitude, obj.fields.latitude]
					};

					if (obj.fields.latitude !== undefined && obj.fields.longitude !== undefined) {
						geo.features.push(geoPoint);
					}
				}

				let params = {
					data: geo,
					alias: options.alias,
					type: options.type,
					journey: options.journey
				};

				switch (options.journey) {
					case 'tribes':
						this.setState({ tribes: this.state.tribes.set(name, params) });
						break;
					default:
						this.setState({ overlays: this.state.overlays.set(name, params) });
						break;

				}


			});
		});
	}
	loadJSONLayer(name, options) {
		fetch(`/layers/${name}.geojson`)
			.then(data => data.json())
			.then(json => {
				let params = {
					data: json,
					alias: options.alias,
					type: options.type,
					journey: options.journey
				};

				switch (options.journey) {
					case 'ret':
						this.setState({ ret: this.state.ret.set(name, params) });
						break;
					case 'out':
						this.setState({ out: this.state.out.set(name, params) });
						break;
					case 'tribe':
						this.setState({ tribe: this.state.out.set(name, params) })
						break;
					default:
						this.setState({ overlays: this.state.overlays.set(name, params) });
						break;
				}
			});
	}

	renderJSON(layer, name) {
		return (
			<GeoJSON
				data={layer.data}
				key={name}
				style={LayerStyle(name, this)}
				onEachFeature={OnEachFeature(name, this)}
				pointToLayer={PointToLayer(name, this)}
			/>
		);
	}

	renderPath(path) {
		console.log(path);
		let list = [];
		path.forEach((layer, name) => {
			console.log(name);
			list.push(this.renderJSON(layer, name));
		});
		return list;
	}
	renderClean(path) {
		let list = [];
		path.forEach((layer, name) => {
			if (name === 'rettrail' || name === 'outtrail' || name === 'tribes') {
				list.push(this.renderJSON(layer, name));
			}
		});
		return list;
	}

	//bring on the awful hacks! (may be making everything slower)
	zoomBind() {
		var u = document.getElementsByClassName("tribeMarker");
		//var lvl = (this["_zoom"] - 3) * 0.4;
		var lvl = (this["_zoom"]) * 0.2;
		lvl += "em";

		for (var i = 0; i < u.length; i++) {
			u[i].style.fontSize = lvl;
		}
		var v = document.getElementsByClassName("tribeMarker2");

		for (var i = 0; i < v.length; i++) {
			v[i].style.fontSize = lvl;
		}
		var w = document.getElementsByClassName("tribeMarkerBeta");

		for (var i = 0; i < w.length; i++) {
			w[i].style.fontSize = lvl;
		}
	}


	renderOverlays() {
		let layers = [];
		this.state.overlays.forEach((layer, name) => {
			layers.push(
				<LayersControl.Overlay name={layer.alias} key={name}>
					{this.renderJSON(layer, name)}
				</LayersControl.Overlay>
			);
		});
		return layers;
	}

	//allows MinZoom to access the closeSide, which in turn toggles the sidebar on and off
	//the whole chain tunnels through 4 different parent/child functions...
	closeSidebar() {
		this.props.closeSide();
	}
	closeSidebarTribe() {
		this.props.closeSideTribe();
	}

	//onPopupOpen={console.log(this.state.map)}
	render() {
		console.log(this.state.out);
		return (
			<div>
				<LMap
					ref="map"
					className="MapPane"
					center={[43.00195216, -150]}
					zoom={5}
					zoomControl={false}
					minZoom={4}
					onZoomEnd={this.zoomBind}
					onOverlayAdd={this.zoomBind}
					maxBounds={[
						[52.02447537, -142],
						[20.07730658, -50.14678921]
					]}>
					<ZoomControl position="topright" />
					<MinZoom side={this.closeSidebar} sideTribe={this.closeSidebarTribe} sideTribeSection={this.closeSidebarTribeSection} />
					<LayersControl position="topright">
						<LayersControl.BaseLayer name="Outbound" checked={true}>
							<LayerGroup>{this.renderPath(this.state.out)}</LayerGroup>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Return">
							<LayerGroup>{this.renderPath(this.state.ret)}</LayerGroup>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Outbound Trail">
							<LayerGroup>{this.renderClean(this.state.out)}</LayerGroup>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Return Trail">
							<LayerGroup>{this.renderClean(this.state.ret)}</LayerGroup>
						</LayersControl.BaseLayer>
						<LayersControl.Overlay name="Beta-Tribes" >
							<LayerGroup>{this.renderClean(this.state.tribes)}</LayerGroup>
						</LayersControl.Overlay>
						<LayersControl.Overlay name="USA Rivers, Streams" key="usars">
							<TileLayer url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}" />
						</LayersControl.Overlay>
						{this.renderOverlays()}
					</LayersControl>
					<MapLegend />

					<TileLayer
						attribution="Map tiles by <a href=&quot;http://stamen.com&quot;>Stamen Design</a>"
						url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.png"
					/>

				</LMap>
			</div>
		);
	}
}
