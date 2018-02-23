import * as React from 'react'
import { Button } from 'reactstrap'
import './TopBar.css'

export default class TopBar extends React.Component{
  render() {
    return (
      <div id="topbar" color="light">
        <Button className="button" color="primary" id="layers"
        onClick={this.props.toggleLayers}>Layers</Button>
        <Button className="button" color="primary" id="settings">Settings</Button>
        <div id="text">the corps of discovery online </div>
      </div>
    );
  }
}
