import React, { Component } from 'react';
import { Card, CardHeader, Button, ButtonGroup } from 'reactstrap';
import InfoPane from '../InfoPane/InfoPane'
import './Sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { activePane: 'info' }
    this.onPaneSwitch = this.onPaneSwitch.bind(this);
  }
  onPaneSwitch(pane) {
    this.setState({ activePane: pane })
  }
  render() {
    return (
      <Card className="Sidebar position-absolute">
        <CardHeader>
          <ButtonGroup>
            <Button color={this.state.activePane === 'info' ? 'primary' : 'secondary'} onClick={() => this.onPaneSwitch('info')} >info</Button>
            <Button color={this.state.activePane === 'layers' ? 'primary' : 'secondary'} onClick={() => this.onPaneSwitch('layers')} >layers</Button>
          </ButtonGroup>
        </CardHeader>
        <InfoPane />
      </Card>
    )
  }
}

export default Sidebar;
