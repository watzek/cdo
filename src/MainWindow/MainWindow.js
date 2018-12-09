import './MainWindow.css'
import * as React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import MapPane from '../MapPane/MapPane'

export default class MainWindow extends React.Component{
  state = {
    showSidebar: true,
    activeLayers: ['trail'],
    activePane: 'layers',
    paneInfo: null,
    activeTrail: 'outbound',
    nextPoint: 0
  }
  constructor(){
    super()
    this.changeLayer = this.changeLayer.bind(this)
    this.changePane = this.changePane.bind(this)
    this.switchTrail = this.switchTrail.bind(this)
    this.closeHandler = this.closeHandler.bind(this)
    this.changeWaypoint = this.changeWaypoint.bind(this)
  }


  changePane(pane,info){
    switch(pane){
      case 'info':
        this.setState({activePane: pane, paneInfo: info})
        if(!this.props.showSidebar) this.props.toggleLayers()
        break
      case 'layers':
        this.setState({activePane: pane, paneInfo: null})
        break
      default:
        break
    }
  }

  //this.props.toggleLayers controls the sidebar opening and closing...
  closeHandler() {
    this.props.toggleLayers();
  }


  switchTrail(trailId){
    this.setState({activeTrail: trailId})
    //TODO refresh the POI layer so that it changes as well, call _onresize()?
  }

  changeLayer(layer){
    var layers = this.state.activeLayers
    if (layers.includes(layer)) layers = layers.filter(l => l !== layer)
    else layers.push(layer)
    this.setState({activeLayers: layers})
    //setstate has been called so render() will change mappane's activelayers
  }

  //somewhere nextWaypoint is increasing by 2 instead of 1
  changeWaypoint(goTo){
    this.setState({nextPoint: goTo});
  }

//TODO make all pane related stuff a subprop called "pane" e.g. this.state.pane.paneInfo
  render() {
    return (
      <div>
        {this.state.showSidebar && <Sidebar  showSidebar={this.props.showSidebar}
        changeLayer={this.changeLayer}
        activeLayers={this.state.activeLayers} changePane={this.changePane}
        activePane={this.state.activePane} paneInfo={this.state.paneInfo}
        switchTrail={this.switchTrail}
        changeWaypoint={this.changeWaypoint}
        toggleLayers={this.props.toggleLayers}/>}
        <MapPane closeSide={this.closeHandler} activeLayers={this.state.activeLayers} changePane={this.changePane}
        activeTrail={this.state.activeTrail} nextPoint={this.state.nextPoint}/>
      </div>

    );
  }
}
