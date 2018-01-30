// @flow
import * as React from 'react'
import { Card, CardHeader, Button, ButtonGroup } from 'reactstrap'
import InfoPane from '../InfoPane/InfoPane'
import LayersPane from '../LayersPane/LayersPane'
import './Sidebar.css'

export default class Sidebar extends React.Component<{}, State> {
  state = { activePane: 'layers' }

  onPaneSwitch(pane) {
    this.setState({ activePane: pane })
  }

  renderPaneButton(pane){
    return (
      <Button
        color={this.state.activePane === pane ? 'primary' : 'secondary'}
        onClick={() => this.onPaneSwitch(pane)}>
        {pane}
      </Button>
    )
  }

  renderPane(pane){
    switch (pane) {
      case 'info': return (<InfoPane />)
      case 'layers': return (<LayersPane changeLayer={this.props.changeLayer} activeLayers={this.props.activeLayers}/>)
      default: return null
    }
  }

  render() {
    return (
      <Card className="Sidebar position-absolute">
        <CardHeader>
          <ButtonGroup>
            {this.renderPaneButton('layers')}
            {this.renderPaneButton('info')}
          </ButtonGroup>
        </CardHeader>
        {this.renderPane(this.state.activePane)}
      </Card>
    )
  }
}
