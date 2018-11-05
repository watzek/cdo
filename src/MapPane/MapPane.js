/*
This js file is the centerpiece of the code. It contains the code for the
actual map pane, which holds a leaflet map and imports all of the layers and
also interacts with the other components of the application via props that it
has been passed.
*/

import * as React from 'react';
import {
	Map as LMap,
	ZoomControl,
	TileLayer,
	GeoJSON,
	LayersControl,
	LayerGroup
} from 'react-leaflet';
import './MapPane.css';
import MapLegend from './MapLegend';
import { LayerStyle, OnEachFeature, PointToLayer } from './LayerCustomize.js';

export default class MapPane extends React.Component {
	state = {
		overlays: new Map(),
		out: new Map(),
		ret: new Map(),
		map: null,
		activeWaypoint: -1
	};

	componentDidMount() {
		this.loadJSONLayer('biomes', { alias: 'Biomes' });
		this.loadJSONLayer('tribes', { alias: 'Tribes' });
		this.loadJSONLayer('1803', {alias: '1803 Political Map'});
		this.loadJSONLayer('rettrail', { alias: 'Return', journey: 'ret' });
		this.loadJSONLayer('outtrail', { alias: 'Outbound', journey: 'out' });
		this.loadAirLayer('filterByFormula=FIND("inbound", {Trip%20Portion})', 'outpoi', { alias: 'Outbound', journey: 'out' });
		this.loadAirLayer('filterByFormula=FIND("outbound", {Trip%20Portion})', 'retpoi', { alias: 'Return', journey: 'ret' });
		this.setState({ map: this.refs.map.leafletElement });
	}

	loadAirLayer(query, name, options){
		const url = 'https://api.airtable.com/v0/appNr9GTJe3BAOfph/Table%201?view=Grid%20view&' + query;
		const key = 'keyfN8VFBQ25v07Pv';

		var geo = {};
		geo.type = "FeatureCollection";
		geo.crs = {"type" : "name", "properties" : {"name": "urn:ogc:def:crs:OGC:1.3:CRS84" }};
		geo.features = [];

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

	renderOut() {
		let list = [];
		this.state.out.forEach((layer, name) => {
			list.push(this.renderJSON(layer, name));
		});
		//console.log(JSON.parse(this.state.out));
		return list;
	}
	renderRet() {
		let list = [];
		this.state.ret.forEach((layer, name) => {
			list.push(this.renderJSON(layer, name));
		});
		return list;
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
					maxBounds={[
						[52.02447537, -142],
						[20.07730658, -50.14678921]
					]}>
					<ZoomControl position="topright" />
					<LayersControl position="topright">
						<LayersControl.BaseLayer name="Outbound" checked={true}>
							<LayerGroup>{this.renderOut()}</LayerGroup>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Return">
							<LayerGroup>{this.renderRet()}</LayerGroup>
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
