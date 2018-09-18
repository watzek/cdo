import * as React from 'react'
import './TopBar.css'

export default class TopBar extends React.Component{
  render() {
    return (
      <div id="topbar" color="light">
      <a href="https://library.lclark.edu/" target="_blank">
        <img id="watzek" alt="watzek" src="watzek_logo.jpg"/>
      </a>

        <img id="title" alt="expedtiton maps" src="title.png"/>
      </div>
    )
  }
}
// <Button className="Button" color="primary" id="layers"
// onClick={this.props.toggleLayers}>Layers</Button>
// <Button className="Button" color="primary" id="settings">Settings</Button>
//        <span id="text">Lewis & Clark Expedition Map</span>
