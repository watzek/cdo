import React, { Component } from 'react';
import { Map, ZoomControl, TileLayer, GeoJSON } from 'react-leaflet';
import InfoPane from '../InfoPane/InfoPane';
import 'whatwg-fetch';
import './MapPane.css';

class MapPane extends Component {
  constructor() {
    super()
    this.state = {'layers' : {} };
    fetch('/layers/trail.geojson')
      .then((response) => {
        return response.json()
      }).then((json) => {
        this.setState({'layers' : {'trail' : json } });
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
  }
  render() {
    return (
      <div>
        <InfoPane />
        <Map className="MapPane rounded mt-3" center={[40,-120]} zoom={5} zoomControl={false}>
          <ZoomControl position="topright" />
          { this.state.layers.trail &&
            <GeoJSON data={this.state.layers.trail} />
          }
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
