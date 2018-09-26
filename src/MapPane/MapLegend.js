/*
MapLegend is the js file that represents the code for the legend on the Map
that houses information about the waypoints' color association.
It is an extension of MapControl which is an object found in the react-leaflet
library.
Because it extends mapcontorl, it can behave like any ordinary react component
but leaflet will do all the work to natively nest it inside the map.

It's a little different from a regular react component, because isntead of
having its own render() method, we're setting its this.leafletElement to some JSX
that will then be rendered during runtime.

The element is also associated with a CSS file that stylizes it.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import './MapLegend.css';
import { MapControl } from 'react-leaflet';

const categories = [
	'Geographic Feature',
	'Corps Relations',
	'Native American Encounter',
	'Important Campsite',
	'Natural History'
];

const marker_colors = [
	'icon_yellow.svg',
	'icon_gray.svg',
	'icon_pink.svg',
	'icon_green.svg',
	'icon_blue.svg',
	'map-marker-icon.png'
];

export default class MapLegend extends MapControl {
	renderCategories() {
		var js = [];

		for (var i = 0; i < 5; i++) {
			js.push(
				<div>
					{' '}
					<img id="icons" alt="icon" src={marker_colors[i]} /> {categories[i]}{' '}
				</div>
			);
		}
		return js;
	}

	componentWillMount() {
		const centerControl = L.control({ position: 'bottomright' });

		const jsx = (
				<div id="legend">
					{this.renderCategories()}
					<div id="line"></div>
					<a href = "#">
						<span id="info">about this map</span>
					</a>
				</div>
			);

		centerControl.onAdd = function(map) {
			let div = L.DomUtil.create('div', '');
			ReactDOM.render(jsx, div);
			return div;
		};

		this.leafletElement = centerControl;
	}
}
