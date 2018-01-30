// @flow
import React, { Component } from 'react'
import TopBar from './TopBar/TopBar'
import MainWindow from './MainWindow/MainWindow'
import './App.css'

class App extends Component<{}> {
  render() {
    return (
      <div className="App container">
        <TopBar />
        <MainWindow />
      </div>
    );
  }
}

export default App
