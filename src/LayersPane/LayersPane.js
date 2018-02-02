import * as React from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, ButtonDropdown,
  CardBody, CardTitle, ListGroup, ListGroupItem, Button } from 'reactstrap';
import './LayersPane.css'

class LayersPane extends React.Component {

  constructor(props) {
      super(props);

      this.trailDropdown = this.trailDropdown.bind(this);
      this.state = {
        trailDropdownOpen: false,
        trails: 'outbound'
      };
    }


trailDropdown(){
  this.setState({trailDropdownOpen: !this.state.trailDropdownOpen})
}



  renderDropdown(idName){
    if(idName==='trail')
    return (<ButtonDropdown id="dd" isOpen={this.state.trailDropdownOpen} toggle={this.trailDropdown} >
           <DropdownToggle caret/>
           <DropdownMenu>
             <DropdownItem onClick={()=>this.props.switchTrail('outbound')}>Outbound trip</DropdownItem>
             <DropdownItem onClick={()=>this.props.switchTrail('return')}>Return trip</DropdownItem>
           </DropdownMenu>
         </ButtonDropdown>)
  }


  renderLayerButton(idName,displayName){
return (<ListGroupItem >
<Button color="success" onClick={() => this.props.changeLayer(idName)}
 active={this.props.activeLayers.includes(idName)}>{displayName}</Button>
 {this.renderDropdown(idName)}
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
