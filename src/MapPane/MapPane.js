import React, { Component } from 'react';
import { Map, ZoomControl, TileLayer } from 'react-leaflet';
import InfoPane from '../InfoPane/InfoPane';
import './MapPane.css';

class MapPane extends Component {
  render() {
    return (
      <div>
        <InfoPane />
        <Map className="MapPane rounded mt-3" center={[40,-120]} zoom={5} zoomControl={false}>
        <ZoomControl position="topright" />
        <TileLayer
        attribution="Map tiles by <a href=&quot;http://stamen.com&quot;>Stamen Design</a>"
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.png"
        />
        </Map>
      </div>
    );
  }
}

export default MapPane;
