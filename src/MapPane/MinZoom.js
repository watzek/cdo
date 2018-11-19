import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { MapControl } from 'react-leaflet';

const ctrlStyle = {
  font: 'bold 18px',
  fontFamily: "'Lucida Console', Monaco, monospace",
	textIndent: '1px',
  boxSizing: 'border-box'
};

export default class MinZoom extends MapControl {  // note we're extending MapControl from react-leaflet, not Component from react

  far = (e) => {
    e.preventDefault();
    const map = this.context.map;
    console.log(map);
    map.setZoom(4);
  };

  componentWillMount() {
    const centerControl = L.control({position: 'topright'});  // see http://leafletjs.com/reference.html#control-positions for other positions
    const jsx = (
      // PUT YOUR JSX FOR THE COMPONENT HERE:
      <div className="leaflet-bar">
        <a class="leaflet-control-zoom-in" href="#" onClick={this.far} title="Reset View" role="button" aria-label="Reset View">&#x2302;</a>
      </div>
    );

    centerControl.onAdd = function (map) {
      let div = L.DomUtil.create('div', '');
      ReactDOM.render(jsx, div);
      return div;
    };

    this.leafletElement = centerControl;
  }
}
