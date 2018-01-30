import * as React from 'react';
import { CardBody, CardTitle, ListGroup, ListGroupItem, Button } from 'reactstrap';
import './LayersPane.css'

class LayersPane extends React.Component {

  renderLayerButton(idName,displayName){
return (<ListGroupItem>
<Button color="success" onClick={() => this.props.changeLayer(idName)}
 active={this.props.activeLayers.includes(idName)}>{displayName}</Button>
</ListGroupItem>)
  }

  render() {
    return (
      <CardBody>
        <CardTitle>Select Map Layers</CardTitle>
        <ListGroup>
            {this.renderLayerButton('trail','Trails')}
            {this.renderLayerButton('biomes','Biomes')}
            {this.renderLayerButton('poi','Points of Interest')}
        </ListGroup>
      </CardBody>
    )
  }
}

export default LayersPane
