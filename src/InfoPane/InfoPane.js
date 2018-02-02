// @flow
import * as React from 'react';
import { CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

export default class InfoPane extends React.Component{

  render() {
    return (
      <CardBody>
        <CardTitle>{this.props.paneInfo ? this.props.paneInfo.Name : null}</CardTitle>
          {this.props.paneInfo ? this.props.paneInfo.Synopsis : null}

      </CardBody>
    )
  }
}
