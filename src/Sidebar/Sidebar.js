import * as React from 'react'
import { Card, CardHeader, Button } from 'reactstrap'
import LayersPane from '../LayersPane/LayersPane'
import Scroll from 'react-awesome-scroll'

import './Sidebar.css'

export default class Sidebar extends React.Component{

  renderSidebar(){
    return (<Card className="Sidebar position-absolute">
      <CardHeader>
        <Button color="danger" className="close" aria-label="Close"
        onClick={this.props.toggleLayers} id="exit">
        <span aria-hidden="true">&times;</span>
        </Button>
      </CardHeader>

      <div id="contain">
      <div id="scroll">
              <Scroll>

                <h2 id="header">{this.props.paneInfo ? this.props.paneInfo.Name : null}</h2>
                <img id="img" alt="l&c test" src="lclark.jpeg"/>
                <div id="txt">
                  {this.props.paneInfo ? this.props.paneInfo.Synopsis : null}
                </div>
                <div id="link">
                  <a href={this.props.paneInfo ? this.props.paneInfo['Journal Entries'] : null}>
                  Link to Journal</a>
                </div>

              </Scroll>
      </div>
      </div>

    </Card>)
  }


  render() {
    return (
      this.props.showSidebar ? this.renderSidebar() : null
  )}
}
