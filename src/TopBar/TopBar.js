import * as React from 'react'
import './TopBar.css'

export default class TopBar extends React.Component{
  render() {
    return (
      <div id="topbar" color="light">
        <div id="strike"></div>
        <span id="sideText">A project by the Watzek Library</span>
        <span id="title">Lewis & Clark Expedition Maps</span>
        <span id="sideText">At Lewis & Clark College</span>
      </div>
    )
  }
}
// <Button className="Button" color="primary" id="layers"
// onClick={this.props.toggleLayers}>Layers</Button>
// <Button className="Button" color="primary" id="settings">Settings</Button>
//        <span id="text">Lewis & Clark Expedition Map</span>
