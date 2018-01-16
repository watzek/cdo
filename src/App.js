import React, { Component } from 'react';
import TopBar from './TopBar/TopBar';
import InfoPane from './InfoPane/InfoPane';
import MapPane from './MapPane/MapPane';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <TopBar />
        <MapPane />
      </div>
    );
  }
}

export default App;
