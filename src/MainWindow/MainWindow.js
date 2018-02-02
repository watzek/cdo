// @flow
import * as React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import MapPane from '../MapPane/MapPane'

export default class MainWindow extends React.Component<{}, State> {
  state = {
    showSidebar: true,
    activeLayers: ['trail'],
    activePane: 'layers',
    paneInfo: null,
    activeTrail: 'outbound'
  }
  constructor(){
    super()
    this.changeLayer = this.changeLayer.bind(this)
    this.changePane = this.changePane.bind(this)
    this.switchTrail = this.switchTrail.bind(this)
  }

  changePane(pane,info){
    switch(pane){
      case 'info':
        this.setState({activePane: pane, paneInfo: info})
        break
      case 'layers':
        this.setState({activePane: pane, paneInfo: null})
        break
      default:
        break
    }
  }

  switchTrail(trailId){
    this.setState({activeTrail: trailId})
  }

  changeLayer(layer){
    var layers = this.state.activeLayers
    if (layers.includes(layer)) layers = layers.filter(l => l !== layer)
    else layers.push(layer)
    this.setState({activeLayers: layers})
    //setstate has been called so render() will change mappane's activelayers
  }

//TODO make all pane related stuff a subprop called "pane" e.g. this.state.pane.paneInfo
  render() {
    return (
      <div>
        {this.state.showSidebar && <Sidebar  changeLayer={this.changeLayer}
        activeLayers={this.state.activeLayers} changePane={this.changePane}
        activePane={this.state.activePane} paneInfo={this.state.paneInfo}
        switchTrail={this.switchTrail}/>}
        <MapPane activeLayers={this.state.activeLayers} changePane={this.changePane}
        activeTrail={this.state.activeTrail}/>
      </div>
    );
  }
}
