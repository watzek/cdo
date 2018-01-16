import React, { Component } from 'react';
import { Card, CardHeader, CardImg, CardText, CardBody,
         CardTitle, CardSubtitle, Button, ButtonGroup } from 'reactstrap';
import './InfoPane.css';

class InfoPane extends Component {
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
      <Card className="InfoPane position-absolute">
        <CardHeader>
          <ButtonGroup>
            <Button color={this.state.activePane === 'info' ? 'primary' : 'secondary'} onClick={() => this.onPaneSwitch('info')} >info</Button>
            <Button color={this.state.activePane === 'layers' ? 'primary' : 'secondary'} onClick={() => this.onPaneSwitch('layers')} >layers</Button>
          </ButtonGroup>
        </CardHeader>
        <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>"Some quick example text to build on the card title and make up the bulk of the card's content."</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    )
  }
}

export default InfoPane;
