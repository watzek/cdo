// @flow
import * as React from 'react'
import { Map as LMap, ZoomControl, TileLayer, GeoJSON } from 'react-leaflet'
import './MapPane.css'

type Layer = {
  name: string,
  data: any,
  hidden: boolean
}

type State = {
  layers: Map<string, Layer>
}

class MapPane extends React.Component<{}, State> {
  state = {
    layers: new Map()
  }

  componentDidMount() {
    this.loadJSONLayer('biomes', { hidden: false })
    this.loadJSONLayer('trail', { hidden: false })
    this.loadJSONLayer('poi', { hidden: false })
  }

  loadJSONLayer(name: string, options: any) {
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
        hidden: layer.hidden
      })
    })
    return layers
      .filter(layer => !layer.hidden)
      .map(layer => <GeoJSON data={layer.data} key={layer.name}/>)
  }

  toggleLayer(name: string) {
    this.setState((prevState: State) => {
      let prevLayer = prevState.get(name)
      return {
        layers: prevState.layers.set(name, {
          ...prevLayer,
          hidden: !prevLayer.hidden
        })
      }
    })
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

export default MapPane
