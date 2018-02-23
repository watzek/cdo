import * as React from 'react'
import Scroll from 'react-awesome-scroll'
import './InfoPane.css'

export default class InfoPane extends React.Component{

  render() {
    console.log(this.props.paneInfo['Journal Entries'])
    return (

      <div id="contain">
      <div id="scroll">
              <Scroll>

                <h2 id="header">{this.props.paneInfo ? this.props.paneInfo.Name : null}</h2>
                <img id="img" alt="l&c test" src="lclark.jpeg"/>
                <div id="txt">
                  {this.props.paneInfo ? this.props.paneInfo.Synopsis : null}
                </div>
                <div id="link">
                  <a href={this.props.paneInfo ? this.props.paneInfo['Journal Entries'] : null}>
                  Link to Journal</a>
                </div>

              </Scroll>
      </div>
      </div>
    )
  }
}
