// @flow
import React, { Component } from 'react'
import Topbar from './Topbar/Topbar'
import MainWindow from './MainWindow/MainWindow'
import './App.css'

class App extends Component<{}> {
  render() {
    return (
      <div className="App container">
        <Topbar />
        <MainWindow />
      </div>
    );
  }
}

export default App
