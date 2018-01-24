// @flow
import * as React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import MapPane from '../MapPane/MapPane'

type State = {
  showSidebar: boolean
}

class MainWindow extends React.Component<{}, State> {
  state = {
    showSidebar: true
  }

  render() {
    return (
      <div>
        {this.state.showSidebar && <Sidebar />}
        <MapPane />
      </div>
    );
  }
}

export default MainWindow
