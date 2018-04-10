import * as React from 'react'
import { Card, CardHeader, Button } from 'reactstrap'
import Scroll from 'react-awesome-scroll'
import './Sidebar.css'

const months = ['January','February','March','April','May','June',
                'July', 'August','September','October','November','December'];

export default class Sidebar extends React.Component{

  constructor(props){
    super(props);
    this.reformatDate = this.reformatDate.bind(this)
  }


  reformatDate(date){
    let date2 = date.split('/');
    return `${months[date2[0]-1]} ${date2[1]}, ${date2[2]} \n`
  }


  renderSidebar(){
    //TODO
    //padding,
    //try a custom image,
    //make everything even w/ CSS


    return (<div className="Sidebar position-absolute">
      <div id="header">
        <div >
          {this.props.paneInfo ? this.props.paneInfo.Name : null}

          <Button color="danger" className="close" aria-label="Close"
          onClick={this.props.toggleLayers} id="exit">
            <span aria-hidden="true">&times;</span>
          </Button>
        </div>
      </div>

      <div id="contain">
      <div id="scroll">
              <Scroll>
                <img id="img" alt="l&c test" src="lclark.jpeg"/>
                <div id="txt">
                  {this.props.paneInfo ? this.reformatDate(this.props.paneInfo.Date) : null}
                  {this.props.paneInfo ? this.props.paneInfo.Synopsis : null}
                </div>
                <div id="link">
                  <a  onClick={()=>(window.open (this.props.paneInfo['Journal Entries'], ''))} href="#">
                  { this.props.paneInfo['Journal Entries']? 'Link to Journal' : null}</a>
                </div>
              </Scroll>
      </div>
      </div>

    </div>)
  }


  render() {
    return (
      this.props.showSidebar ? this.renderSidebar() : null
  )}
}
/*
<CardHeader>
<div >{this.props.paneInfo ? this.props.paneInfo.Name : null} - {this.props.paneInfo ? this.props.paneInfo.Date : null}

  <Button color="danger" className="close" aria-label="Close"
  onClick={this.props.toggleLayers} id="exit">
  <span aria-hidden="true">&times;</span>
  </Button>
  </div>
</CardHeader>
*/
