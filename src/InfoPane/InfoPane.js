// @flow
import * as React from 'react';
import { CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

class InfoPane extends React.Component{
  state = {
    title: "",
    subtitle: "Click on the map to view more information. \u00bb",
    text: ""
  }

  onInfoChange(info) {
    this.setState({
      title: info.title,
      subtitle: info.subtitle,
      text: info.text
    })
  }

  render() {
    return (
      <CardBody>
        <CardTitle>{this.state.title}</CardTitle>
        <CardSubtitle>{this.state.subtitle}</CardSubtitle>
        <CardText>{this.state.text}</CardText>
      </CardBody>
    )
  }
}

export default InfoPane;
