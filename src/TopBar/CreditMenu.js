import * as React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './CreditMenu.css';
import {about} from './credits.js';

const dropStyle = {
  border: '1px solid gray',
  borderRadius: '4px',
  color: '#0a100d',
  lineHeight: 'normal',
  paddingTop: '0.5em',
  paddingBottom: '0.5em',
  fontSize: '0.9em',
  textAlign: 'left',
};

const dropTitle = {
  fontSize: '1.3em',
  textAlign: 'center'
}

const dropBody = {
  margin: '0.5em',
}

class DMenuItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      info: this.props.info,
      stuff: about,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState({open: !this.state.open});
  }

  render () {
    var fill = (<div style={dropTitle}> {this.state.info} </div>);
    const isClicked = this.state.open;

    if(isClicked){
      fill = (
        <div>
          <div style={dropTitle}> {this.state.info} </div>
          <div style={dropBody}> {this.state.stuff} </div>
        </div>
      );
    }

    return(
      <div style={dropStyle} onClick={this.handleClick}>
        {fill}
      </div>
    );
  }
}

export default class CreditMenu extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return (
      <Menu styles = {styles} width={ '30%' }>
        <a id="cited" className="menu-item" href="/">Works Cited</a>
        <a id="reading" className="menu-item" href="/about">Further Reading</a>

        <DMenuItem info={"about this map"} subtext={"nothing"} />

        <div></div>

        <div id="menuinfo">
          A project by the <a href="http://library.lclark.edu">Watzek Library</a> at <a href="https://www.lclark.edu">Lewis & Clark College</a>
        </div>
      </Menu>
    );
  }
}

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '3vh',
    height: '3vh',
    top: '2vh',
    left: '2vh',
  },
  bmBurgerBars: {
    background: '#373a47',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#0a100d'
  },
  bmMenu: {
    background: '#BCD8B7',
    padding: '0.6em 0.2em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block',
    width: '100%',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.5)'
  }
}
