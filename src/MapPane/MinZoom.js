import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { MapControl } from 'react-leaflet';

export default class MinZoom extends MapControl {
  far = (e) => {
    e.preventDefault();
    const map = this.context.map;
    map.setZoom(4);
    this.props.side();
  };

  componentWillMount() {
    const centerControl = L.control({position: 'topright'});
    const jsx = (
      // PUT YOUR JSX FOR THE COMPONENT HERE:
      <div className="leaflet-bar">
        <a class="leaflet-control-zoom-in" onClick={this.far} title="Reset View" role="button" aria-label="Reset View">&#x2302;</a>
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
