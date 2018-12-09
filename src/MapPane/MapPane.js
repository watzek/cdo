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
import { LayerStyle, OnEachFeature, PointToLayer, goToPOI} from './LayerCustomize.js';
import MinZoom from './MinZoom.js';

export default class MapPane extends React.Component {
	constructor(props){
		super(props);
		this.closeSidebar = this.closeSidebar.bind(this);
	}

	state = {
		overlays: new Map(),
		out: new Map(),
		ret: new Map(),
		map: null,
		activeWaypoint: -1,
		popIsOpen: false
	};

	componentDidMount() {
		this.loadJSONLayer('biomes', { alias: 'Biomes' });
		this.loadJSONLayer('tribes', { alias: 'Tribes' });
		this.loadJSONLayer('1803', {alais: 'Political Map 1803'});
		this.loadJSONLayer('marias_river_4', {alais: 'Rivers'});
		this.loadJSONLayer('rettrail', { alias: 'Return', journey: 'ret' });
		this.loadJSONLayer('outtrail', { alias: 'Outbound', journey: 'out' });
		this.loadAirLayer('filterByFormula=FIND("inbound", {Trip%20Portion})', 'outpoi', { alias: 'Outbound', journey: 'out' });
		this.loadAirLayer('filterByFormula=FIND("outbound", {Trip%20Portion})', 'retpoi', { alias: 'Return', journey: 'ret' });
		this.setState({ map: this.refs.map.leafletElement });

		//warning: this may cause unintended troubles with popups randomly closing
		//I tried to make it only close waypoints

		this.refs.map.leafletElement.on('preclick', function(e){
			var mapCopy = this;
			this.eachLayer(function(layer) {
    		if(layer.options.pane === "tooltipPane" && ("Category" in layer['_source'].feature.properties)){
					layer.removeFrom(mapCopy);
				}
			});
		});

	}

	//takes care of handling next and previous buttons
	componentDidUpdate(oldProps){
		if(this.props.nextPoint !== oldProps.nextPoint){
			var next = this.props.nextPoint; //get feature with this ID...

			var outMin = this.state.out.get("outpoi").data.features[0].properties.WaypointID;
			var outMax = this.state.out.get("outpoi").data.features[this.state.out.get("outpoi").data.features.length - 1].properties.WaypointID;

			var retMin = this.state.ret.get("retpoi").data.features[0].properties.WaypointID;
			var retMax = this.state.ret.get("retpoi").data.features[this.state.ret.get("retpoi").data.features.length - 1].properties.WaypointID;

			var layerT = this.state.ret;
			var feature = this.state.ret.get("retpoi").data.features[next - 48];
			if (retMin <= next){ // use return waypoints
				//console.log("ret");
				if(retMin <= next && retMax >= next) goToPOI(feature, layerT, this);
			} else {
				//console.log("out");
				layerT = this.state.out;
				feature = this.state.out.get("outpoi").data.features[next - 1];

				if(next >= outMin && next <= outMax) goToPOI(feature, layerT, this);
			}

 		}
	}

	loadAirLayer(query, name, options){
		const url = 'https://api.airtable.com/v0/appNr9GTJe3BAOfph/Table%201?view=Grid%20view&' + query + '&sort=';
		const key = 'keyfN8VFBQ25v07Pv';

		var geo = {};
		geo.type = "FeatureCollection";
		geo.crs = {"type" : "name", "properties" : {"name": "urn:ogc:def:crs:OGC:1.3:CRS84" }};
		geo.features = [];

		//works but causes an eslint error due to unused variable
		// eslint-disable-next-line
		const resp = fetch(url, {
			headers: {
        Authorization: `Bearer ${key}`
			}
		}).then(resp => {
			resp.json().then(json => {
				for(var i = 0; i < json.records.length; i++){
					var geoPoint = {};
					var obj = json.records[i];

					geoPoint.type = "Feature";
					geoPoint.properties = obj.fields;
					geoPoint.geometry = {
						"type": "Point",
						"coordinates": [ obj.fields.longitude, obj.fields.latitude ]
					};

					if(obj.fields.latitude !== undefined && obj.fields.longitude !== undefined){
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
		let list = [];
		path.forEach((layer, name) => {
			list.push(this.renderJSON(layer, name));
		});
		return list;
	}
	renderClean(path) {
		let list = [];
		path.forEach((layer, name) => {
			if(name === 'rettrail' || name === 'outtrail'){
				list.push(this.renderJSON(layer, name));
			}
		});
		return list;
	}

	//bring on the awful hacks! (may be making everything slower)
	zoomBind(){
		var u = document.getElementsByClassName("tribeMarker");
		var lvl = (this["_zoom"] - 3) * 0.4;
		lvl += "em";

		for(var i = 0; i < u.length; i++){
			u[i].style.fontSize = lvl;
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
	closeSidebar(){
		this.props.closeSide();
	}

//onPopupOpen={console.log(this.state.map)}
	render() {
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
					<MinZoom side={this.closeSidebar}/>
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
						{this.renderOverlays()}
						<LayersControl.Overlay name="USA Rivers, Streams" key="usars">
							<TileLayer url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}" />
						</LayersControl.Overlay>
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
