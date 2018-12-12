import * as React from 'react';
import ReactDOM from 'react-dom';
import {about} from './credits.js';
import './model.css'; //some responsive styles here...

//make i responsive???

const coverStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  zIndex: '99999',
  transform: 'translateZ(0)',
  backgroundColor: 'rgba(10, 16, 13, 0.45)'
}

const closeStyle = {
  float: 'right',
  fontSize: '2rem',
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
  marginLeft: '100%'
}

const tabBar = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
  fontWeight: 'bold',
  textAlign: 'center'
}

const tabStyle = {
  width: '50%',
  borderTop: '1px solid #0a100d',
  borderLeft: '1px solid #0a100d',
  borderRight: '1px solid #0a100d',
  borderRadius: '2px 2px 0 0'
}

const closedTabStyle = {
  width: '50%',
  borderBottom: '1px solid #0a100d',
}

class ModalContent extends React.Component {
  constructor(){
    super();
    this.state = {
      selected: 0
    };
    this.state.myBody = "hello";
  }
//do tab magic here
  changeBody = (changeTo) => {
    this.setState({selected: changeTo});
  };

  //the tab system is kind of a hack, but it makes some amount of sense...
  render() {
    const tabStyles = [closedTabStyle, closedTabStyle];
    tabStyles[this.state.selected] = tabStyle;

    const finalBody = about[this.state.selected];

    return ReactDOM.createPortal(
      <div style={coverStyle}>
        <div role="tabpanel" id="hoverStyle">
          <button aria-label="Close" class = "close btn" style={closeStyle} onClick={this.props.onClose}>
            <span aria-hidden="true">×</span>
          </button>

          <div role="tablist" style={tabBar}>
            <span style={closedTabStyle}></span>
            <span role="tab" aria-label="About this map" aria-selected={this.state.selected === 0} style={tabStyles[0]} onClick={() => this.changeBody(0)}>About this map</span>
            <span role="tab" aria-label="Works Cited" aria-selected={this.state.selected === 1} style={tabStyles[1]} onClick={() => this.changeBody(1)}>Works Cited</span>
            <span style={closedTabStyle}></span>
          </div>

          <div id="textBody">
            {finalBody}
          </div>
        </div>
      </div>,
      document.body
    );
  }
}

const ModalTrigger = ({onOpen}) => <button aria-label="Info" class = "close btn" id="openStyle" onClick={onOpen}>&#9432; <span id="iText">info</span></button>;

export default class CreditModal extends React.Component {
  constructor(){
    super();
    this.state = {
      open: false
    };
  }

  onOpen = () => {
    this.setState({open: true});
  };

  onClose = () => {
    this.setState({open: false});
  };

  render() {

    return (
      <React.Fragment>
        <ModalTrigger onOpen={this.onOpen}/>
        {this.state.open && <ModalContent onClose={this.onClose}/>}
      </React.Fragment>
    );
  }
}
