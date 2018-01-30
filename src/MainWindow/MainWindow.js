// @flow
import * as React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import MapPane from '../MapPane/MapPane'

class MainWindow extends React.Component<{}, State> {
  state = {
    showSidebar: true,
    activeLayers: ['trail']
  }
  constructor(){
    super()
    this.changeLayer = this.changeLayer.bind(this)
  }

  changeLayer(layer){
    var layers = this.state.activeLayers
    if (layers.includes(layer)) layers = layers.filter(l => l !== layer)
    else layers.push(layer)
    this.setState({activeLayers: layers})
    //setstate has been called so render() will change mappane's activelayers
  }

  render() {
    return (
      <div>
        {this.state.showSidebar && <Sidebar  changeLayer={this.changeLayer}
        activeLayers={this.state.activeLayers}/>}
        <MapPane activeLayers={this.state.activeLayers} />
      </div>
    );
  }
}

export default MainWindow
