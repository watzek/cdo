import React, { Component } from 'react';
import { Map, ZoomControl, LayersControl, TileLayer, GeoJSON } from 'react-leaflet';
import Sidebar from '../Sidebar/Sidebar';
import 'whatwg-fetch';
import './MapPane.css';

class MapPane extends Component {
  constructor() {
    super()
    this.state = {'layers' : {}};
    fetch('/layers/biomes.geojson').then(data => data.json()).then(json => this.loadLayer('biomes', json))
    fetch('/layers/trail.geojson').then(data => data.json()).then(json => this.loadLayer('trail', json))
  }
  loadLayer(name, data) {
    let state = this.state
    state.layers[name] = data
    this.setState(state)
  }
  render() {
    return (
      <div>
        <Sidebar />
        <Map className="MapPane rounded mt-3" center={[40,-120]} zoom={5} zoomControl={false}>
          <ZoomControl position="topright" />
          <LayersControl position="bottomright">
            <LayersControl.BaseLayer name="basemap">
              <TileLayer
                attribution="Map tiles by <a href=&quot;http://stamen.com&quot;>Stamen Design</a>"
                url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            { this.state.layers.biomes &&
            <LayersControl.Overlay name="biomes">
              <GeoJSON data={this.state.layers.biomes} />
            </LayersControl.Overlay>
            }
            { this.state.layers.trail &&
            <LayersControl.Overlay name="trail">
              <GeoJSON data={this.state.layers.trail} />
            </LayersControl.Overlay>
            }
          </LayersControl>
        </Map>
      </div>
    );
  }
}

export default MapPane;
