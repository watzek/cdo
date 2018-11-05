import * as React from 'react';
import ReactDOM from 'react-dom';
import {about} from './credits.js'
import Scroll from 'react-awesome-scroll';

/*
margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
*/

const hoverStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#F0FFF0',
  zIndex: '1',
  width: '800px',
  height: '500px',
  padding: '0.5rem 0.2rem 0.5rem 0.5rem',
  overflow: 'scroll'
}

const coverStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  zIndex: '999',
  transform: 'translateZ(0)',
  backgroundColor: 'rgba(10, 16, 13, 0.45)'
}

const openStyle = {
  position: 'absolute',
  top:'2vh',
  left:'0.5rem',
  fontSize:'1.1rem',
  height:'3.5vh'
}

const closeStyle = {
  float: 'right',
  fontSize: '2rem',
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
  marginLeft: '100%'
}

const ModalContent = ({onClose}) => {
return ReactDOM.createPortal(
  <div style={coverStyle}>
    <div style={hoverStyle}>
      <button class = "close btn" style={closeStyle} onClick={onClose}>
        <span aria-hidden="true">×</span>
      </button>
        {about}
    </div>
  </div>,
  document.body
);
}


const ModalTrigger = ({onOpen}) => <button class = "close btn" style={openStyle} onClick={onOpen}>&#9432; info</button>;

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
