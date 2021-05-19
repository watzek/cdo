// @flow
import React, { Component } from 'react'
import ReactGA from 'react-ga';
import TopBar from './TopBar/TopBar'
import MainWindow from './MainWindow/MainWindow'
import './App.css'

export default class App extends Component {

  constructor() {
    super()
    this.toggleLayers = this.toggleLayers.bind(this);
    this.toggleTribeLayers = this.toggleTribeLayers.bind(this);
    this.toggleTribeSectionLayers = this.toggleTribeSectionLayers.bind(this);
    this.state = {
      showSidebar: false,
      showSidebarTribe: false,
      showSideBarTribeSection: false
    }
    ReactGA.initialize('UA-134725677-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  toggleLayers(bool) {
    this.setState({ showSidebar: !this.state.showSidebar })

  }
  toggleTribeLayers(bool) {
    this.setState({ showSidebarTribe: !this.state.showSidebarTribe })
  }
  toggleTribeSectionLayers(bool) {
    this.setState({ showSidebarTribeSection: !this.state.showSidebarTribeSection })
  }
  render() {
    return (

      <div id="app">
        <TopBar toggleLayers={this.toggleLayers} />
        <MainWindow showSidebarTribeSection={this.state.showSidebarTribeSection} toggleTribeSectionLayers={this.toggleTribeSectionLayers} showSidebar={this.state.showSidebar} showSidebarTribe={this.state.showSidebarTribe} toggleLayers={this.toggleLayers} toggleTribeLayers={this.toggleTribeLayers} />

      </div>
    );
  }
}
