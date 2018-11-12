import * as React from 'react';
import ReactDOM from 'react-dom';
import {about} from './credits.js'

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

const tabBar = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
  fontWeight: 'bold',
  textAlign: 'center'
}

const tabStyle = {
  width: '33.33%',
  borderTop: '1px solid #0a100d',
  borderLeft: '1px solid #0a100d',
  borderRight: '1px solid #0a100d',
  borderRadius: '2px 2px 0 0'
}

const closedTabStyle = {
  width: '33.333%',
  borderBottom: '1px solid #0a100d',
}

const textBody = {
  width: '100%',
  height: '440px',
  padding: '0.5rem 0.2rem 0.5rem 0.5rem',
  overflow: 'scroll'
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
    var body = about;
    const tabStyles = [closedTabStyle, closedTabStyle, closedTabStyle];
    tabStyles[this.state.selected] = tabStyle;

    const finalBody = about[this.state.selected];

    return ReactDOM.createPortal(
      <div style={coverStyle}>
        <div style={hoverStyle}>
          <button class = "close btn" style={closeStyle} onClick={this.props.onClose}>
            <span aria-hidden="true">×</span>
          </button>

          <div style={tabBar}>
            <span style={closedTabStyle}></span>
            <span style={tabStyles[0]} onClick={() => this.changeBody(0)}>About this map</span>
            <span style={tabStyles[1]} onClick={() => this.changeBody(1)}>Works Cited</span>
            <span style={tabStyles[2]} onClick={() => this.changeBody(2)}>Further Reading</span>
            <span style={closedTabStyle}></span>
          </div>

          <div style={textBody}>
            {finalBody}
          </div>
        </div>
      </div>,
      document.body
    );
  }
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
