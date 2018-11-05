import * as React from 'react';
import './TopBar.css';
import CreditModal from './model.js';


export default class TopBar extends React.Component{
  render() {
    return (
      <div id="topbar" color="light">
        <div></div>
        <CreditModal />
        <span id="title">Corps of Discovery Online Atlas</span>
      </div>
    )
  };
}
