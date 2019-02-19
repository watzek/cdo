// @flow
import React, { Component } from 'react'
import ReactGA from 'react-ga';
import TopBar from './TopBar/TopBar'
import MainWindow from './MainWindow/MainWindow'
import './App.css'

export default class App extends Component{

  constructor(){
    super()
    this.toggleLayers = this.toggleLayers.bind(this);
    this.state = {
      showSidebar: false
    }
    ReactGA.initialize('UA-134725677-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  toggleLayers(bool){
    this.setState({showSidebar: !this.state.showSidebar})
  }

  render() {
    return (

      <div id="app">
        <TopBar toggleLayers={this.toggleLayers}/>
        <MainWindow showSidebar={this.state.showSidebar} toggleLayers={this.toggleLayers}/>
      </div>
    );
  }




}
