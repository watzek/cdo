import * as React from 'react'
import { Card, CardHeader, Button, ButtonGroup } from 'reactstrap'
import InfoPane from '../InfoPane/InfoPane'
import LayersPane from '../LayersPane/LayersPane'
import './Sidebar.css'

export default class Sidebar extends React.Component{

  renderPaneButton(pane){
    return (
      <Button
        color={this.props.activePane === pane ? 'primary' : 'secondary'}
        onClick={() => this.props.changePane(pane)}>
        {pane}
      </Button>
    )
  }

  renderPane(pane){
    switch (pane) {
      case 'info': return (<InfoPane paneInfo={this.props.paneInfo}/>)
      case 'layers': return (<LayersPane changeLayer={this.props.changeLayer}
        activeLayers={this.props.activeLayers} switchTrail={this.props.switchTrail}/>)
      default: return null
    }
  }

  renderSidebar(){
    return (<Card className="Sidebar position-absolute">
      <CardHeader>
        <ButtonGroup>
          {this.renderPaneButton('layers')}
          {this.renderPaneButton('info')}
        </ButtonGroup>
      </CardHeader>
      {this.renderPane(this.props.activePane)}
    </Card>)
  }


  render() {
    return (
      this.props.showSidebar ? this.renderSidebar() : null
  )}
}
