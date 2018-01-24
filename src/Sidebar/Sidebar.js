// @flow
import * as React from 'react'
import { Card, CardHeader, Button, ButtonGroup } from 'reactstrap'
import InfoPane from '../InfoPane/InfoPane'
import LayersPane from '../LayersPane/LayersPane'
import './Sidebar.css'

type State = {
  activePane: string,
}

class Sidebar extends React.Component<{}, State> {
  state = {
    activePane: 'info',
  }

  onPaneSwitch(pane: string) {
    this.setState({ activePane: pane })
  }

  renderPaneButton(pane: string): React$Element<*> {
    return (
      <Button
        color={this.state.activePane === pane ? 'primary' : 'secondary'}
        onClick={() => this.onPaneSwitch(pane)}>
        {pane}
      </Button>
    )
  }

  renderPane(pane: string): ?React$Element<*> {
    switch (pane) {
      case 'info': return (<InfoPane />)
      case 'layers': return (<LayersPane />)
      default: return null
    }
  }

  render() {
    return (
      <Card className="Sidebar position-absolute">
        <CardHeader>
          <ButtonGroup>
            {this.renderPaneButton('info')}
            {this.renderPaneButton('layers')}
          </ButtonGroup>
        </CardHeader>
        {this.renderPane(this.state.activePane)}
      </Card>
    )
  }
}

export default Sidebar
