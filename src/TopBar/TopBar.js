import * as React from 'react';
import './TopBar.css';
import CreditMenu from './CreditMenu.js';

export default class TopBar extends React.Component{
  render() {
    return (
      <div id="topbar" color="light">
        <div><CreditMenu /></div>
        <span id="title">Corps of Discovery Online Atlas</span>
      </div>
    )
  }
}
// <Button className="Button" color="primary" id="layers"
// onClick={this.props.toggleLayers}>Layers</Button>
// <Button className="Button" color="primary" id="settings">Settings</Button>
//        <span id="text">Lewis & Clark Expedition Map</span>
