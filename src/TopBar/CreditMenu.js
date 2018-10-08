import * as React from 'react';
import { slide as Menu } from 'react-burger-menu'
import './CreditMenu.css';

export default class CreditMenu extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return (
      <Menu styles = {styles}>
        <a id="cited" className="menu-item" href="/">Works Cited</a>
        <a id="reading" className="menu-item" href="/about">Further Reading</a>
        <a id="about" className="menu-item" href="/contact">About This Map...</a>
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
    background: '#F0FFF0',
    padding: '2.5em 1.5em 0',
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
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.5)'
  }
}
