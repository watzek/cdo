import * as React from 'react'
import { Map as LMap, ZoomControl, TileLayer, GeoJSON, LayersControl, LayerGroup } from 'react-leaflet'
import './MapPane.css'
import MapLegend from './MapLegend'
import { LayerStyle, OnEachFeature, PointToLayer } from './LayerCustomize.js'


export default class MapPane extends React.Component {
  state = { overlays: new Map(), out: new Map(), ret: new Map() }

  componentDidMount() {
    this.loadJSONLayer('biomes', { alias: 'Biomes' })
    this.loadJSONLayer('rettrail', { alias: 'Return',   journey: 'ret'})
    this.loadJSONLayer('outtrail', { alias: 'Outbound', journey: 'out'})
    this.loadJSONLayer('outpoi',   { alias: 'Outbound', journey: 'out'})
    this.loadJSONLayer('retpoi',   { alias: 'Return',   journey: 'ret'})
  }

  loadJSONLayer(name, options) {
    fetch(`/layers/${name}.geojson`).then(data => data.json()).then(json => {
      let params = {
        data: json,
        alias: options.alias,
        type: options.type,
        journey: options.journey
      }
      switch(options.journey){
      case 'ret':
        this.setState({ ret: this.state.ret.set(name, params) })
        break;
      case 'out':
        this.setState({ out: this.state.out.set(name, params) })
        break;
      default:
        this.setState({ overlays: this.state.overlays.set(name, params) })
        break;
      }
    })
  }

  renderJSON(layer,name){
    return(
      <GeoJSON data={layer.data}
        key={name}
        style={LayerStyle(name, this)}
        onEachFeature={OnEachFeature(name, this)}
        pointToLayer={PointToLayer(name, this)}/>
    )
  }

renderOut(){
  let list = []
  this.state.out.forEach((layer,name) =>
  {
    list.push(this.renderJSON(layer,name))
  })
  return list
}
renderRet(){
  let list = []
  this.state.ret.forEach((layer,name) =>
  {
    list.push(this.renderJSON(layer,name))
  })
  return list
}

  renderOverlays() {
    let layers = []
    this.state.overlays.forEach((layer,name)=>{
      layers.push(
        <LayersControl.Overlay name={layer.alias} key={name}>
          { this.renderJSON(layer,name) }
        </LayersControl.Overlay>
      )
    })
    return layers
}

  render() {
    return (
      <div>
        <LMap className="MapPane" center={[43.00195216,-104.48263139]} zoom={5} zoomControl={false}
        minZoom={5} maxBounds={[[52.02447537,-140.18417959],[30.07730658, -80.14678921]]}>
          <ZoomControl position="topright" />
          <LayersControl position="topleft">
            <LayersControl.BaseLayer name="Outbound" checked={true}>
              <LayerGroup>
                { this.renderOut() }
              </LayerGroup>
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Return">
              <LayerGroup>
                { this.renderRet() }
              </LayerGroup>
            </LayersControl.BaseLayer>
            { this.renderOverlays() }
          </LayersControl>
          <MapLegend/>


            <TileLayer
              attribution="Map tiles by <a href=&quot;http://stamen.com&quot;>Stamen Design</a>"
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.png"/>


        </LMap>
      </div>
    );
  }

}
