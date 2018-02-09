// @flow
import * as React from 'react'
import { Map as LMap, ZoomControl, TileLayer, GeoJSON } from 'react-leaflet'
import './MapPane.css'
import { LayerStyle, OnEachFeature, PointToLayer } from './LayerCustomize.js'


export default class MapPane extends React.Component {
  state = { layers: new Map() }

  componentDidMount() {
    this.loadJSONLayer('biomes', { hidden: true })
    this.loadJSONLayer('trail', { hidden: true })
    this.loadJSONLayer('poi', { hidden: true })
    this.loadJSONLayer('usa_cities', { hidden: true })
  }
  loadJSONLayer(name, options) {
    fetch(`/layers/${name}.geojson`).then(data => data.json()).then(json => {
      this.setState({
        layers: this.state.layers.set(name, {
          data: json,
          hidden: options.hidden
        })
      })
    })
  }


  renderLayers() {
    let layers = []
    this.state.layers.forEach((layer, name) => {
      layers.push({
        name: name,
        data: layer.data,
        hidden: !this.props.activeLayers.includes(name),
        style: LayerStyle(name),                // stylizing for layers found in LayerCustomize.js
        pointToLayer: PointToLayer(name),
        onEachFeature: OnEachFeature(name,this)

      })
    })
    return layers
      .filter(layer => !layer.hidden)
      .map(layer => <GeoJSON data={layer.data} key={layer.name}
        style={layer.style} onEachFeature={layer.onEachFeature} pointToLayer={layer.pointToLayer}/>)
  }

  render() {
    return (
      <div>
        <LMap className="MapPane rounded mt-3" center={[40,-120]} zoom={5} zoomControl={false}>
          <ZoomControl position="topright" />
            <TileLayer
              attribution="Map tiles by <a href=&quot;http://stamen.com&quot;>Stamen Design</a>"
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.png"
            />
            { this.renderLayers() }
        </LMap>
      </div>
    );
  }
}
