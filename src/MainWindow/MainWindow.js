import './MainWindow.css'
import * as React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import MapPane from '../MapPane/MapPane'
import SidebarTribe from '../Sidebar/SidebarTribe'


export default class MainWindow extends React.Component {
  state = {
    showSidebar: true,
    showSidebarTribe: true,
    activeLayers: ['trail'],
    activePane: 'layers',
    paneInfo: null,
    sectionInfo: null,
    tribeInfo: null,
    activeTrail: 'outbound',
    nextPoint: 0,
  }
  constructor() {
    super()
    this.changeLayer = this.changeLayer.bind(this)
    this.changePane = this.changePane.bind(this)
    this.switchTrail = this.switchTrail.bind(this)
    this.closeHandler = this.closeHandler.bind(this)
    this.changeWaypoint = this.changeWaypoint.bind(this)
    this.changeTribe = this.changeTribe.bind(this)
  }


  changePane(pane, info) {
    switch (pane) {
      case 'info':
        this.setState({ activePane: pane, paneInfo: info })
        console.log(info);
        if (this.props.showSidebarTribe) this.props.toggleTribeLayers()
        if (!this.props.showSidebar) this.props.toggleLayers()
        break
      case 'layers':
        this.setState({ activePane: pane, paneInfo: null })
        break
      default:
        break
    }
  }
  changeTribe(tribe, info) {
    switch (tribe) {
      case 'tribeInfo':
        this.setState({ activePane: tribe, tribeInfo: info })
        console.log(info);
        if (!this.props.showSidebarTribe) this.props.toggleTribeLayers()
        break
      default:
        break
    }
  }

  //this.props.toggleLayers controls the sidebar opening and closing...
  closeHandler() {
    this.props.toggleLayers();
  }
  closeHandlerTribe() {
    this.props.toggleTribeLayers();
  }

  switchTrail(trailId) {
    this.setState({ activeTrail: trailId })
    //TODO refresh the POI layer so that it changes as well, call _onresize()?
  }

  changeLayer(layer) {
    var layers = this.state.activeLayers
    if (layers.includes(layer)) layers = layers.filter(l => l !== layer)
    else layers.push(layer)
    this.setState({ activeLayers: layers })
    //setstate has been called so render() will change mappane's activelayers
  }

  //somewhere nextWaypoint is increasing by 2 instead of 1
  changeWaypoint(goTo) {
    this.setState({ nextPoint: goTo });
  }

  //TODO make all pane related stuff a subprop called "pane" e.g. this.state.pane.paneInfo
  render() {
    return (
      <div>
        {this.state.showSidebar && <Sidebar showSidebar={this.props.showSidebar}
          changeLayer={this.changeLayer}
          activeLayers={this.state.activeLayers} changePane={this.changePane}
          activePane={this.state.activePane} paneInfo={this.state.paneInfo}
          switchTrail={this.switchTrail}
          changeWaypoint={this.changeWaypoint} changeTribe={this.changeTribe}
          toggleLayers={this.props.toggleLayers} />}
        {this.state.showSidebarTribe && <SidebarTribe showSidebarTribe={this.props.showSidebarTribe}
          changeLayer={this.changeLayer} changeTribe={this.changeTribe}
          activeLayers={this.state.activeLayers} changePane={this.changePane}
          activePane={this.state.activePane} paneInfo={this.state.paneInfo} sectionInfo={this.state.sectionInfo} tribeInfo={this.state.tribeInfo}
          switchTrail={this.switchTrail}
          changeWaypoint={this.changeWaypoint}
          changeSection={this.changeSection}
          toggleTribeLayers={this.props.toggleTribeLayers} toggleTribeSectionLayers={this.props.toggleTribeSectionLayers} />}

        <MapPane closeSide={this.closeHandler} closeSideTribe={this.closeHandlerTribe} activeLayers={this.state.activeLayers} changePane={this.changePane} changeTribe={this.changeTribe}
          activeTrail={this.state.activeTrail} nextPoint={this.state.nextPoint} changeSection={this.changeSection} />
      </div>

    );
  }
}
