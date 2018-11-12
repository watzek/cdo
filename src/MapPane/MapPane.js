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
		this.loadJSONLayer('1803', {alais: 'Political Map 1803'});
		this.loadJSONLayer('Riv', {alais: 'Historical Rivers'});
		this.loadJSONLayer('rettrail', { alias: 'Return', journey: 'ret' });
		this.loadJSONLayer('outtrail', { alias: 'Outbound', journey: 'out' });
		this.loadJSONLayer('outpoi', { alias: 'Outbound', journey: 'out' });
		this.loadJSONLayer('retpoi', { alias: 'Return', journey: 'ret' });
		this.setState({ map: this.refs.map.leafletElement });
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
					center={[43.00195216, -104.48263139]}
					zoom={5}
					zoomControl={false}
					minZoom={5}
					maxBounds={[
						[52.02447537, -140.18417959],
						[30.07730658, -80.14678921]
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
						<LayersControl.Overlay name="opentopomap" key="opentopomap">
							<TileLayer url="https://c.tile.opentopomap.org/{z}/{x}/{y}.png" />
						</LayersControl.Overlay>
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
