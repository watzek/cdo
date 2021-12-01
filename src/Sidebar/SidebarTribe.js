/*
SidebarTribe.js is a react component that comprises the sidebar for the tribe profiles.
It shows information about each tribe when they are clicked on.
*/
import React, { Component } from "react";
import { Button, Collapse, CardBody, Card, UncontrolledCollapse } from 'reactstrap';
import Scroll from 'react-awesome-scroll';
import './Sidebar.css';


export default class SidebarTribe extends React.Component {

    constructor(props) {
        super(props);
        this.addParagraph = this.addParagraph.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
  this.setState({ collapse: !this.state.collapse });
    }

    addParagraph(Passage) {
        let p = Passage.split('<br/>');
        var p2 = []
        for (let i = 0; i < p.length; i++) {
            p2.push(<p>{p[i]}</p>);

        }

        console.log(p2);

        var p3 = [];
        for (let l = 0; l < p2.length; l++) {
            //return p3.push(p2[l].props.children) + <br />;
            p3.push(p2[l].props.children);
        }

        const html = p3.map((val, idx) => {
            return p3[idx];
        }).join('<br/> <br/>')
        return <p dangerouslySetInnerHTML={{ __html: html }}></p>;

        //console.log(p3);
        // console.log(p3.join("\n"));
        //return p3.join(<br />);
        //return <div dangerouslySetInnerHTML={{ __html: p3 }} />
    }


    renderSidebarTribe() {
        return (
            <div className="Sidebar position-absolute">
                <span id="tour"></span>
                <span id="tour"></span>
                <Button
                    outline color="danger"
                    className="close"
                    aria-label="Close"
                    onClick={this.props.toggleTribeLayers}
                    id="exit">
                    <span aria-hidden="true">&times;</span>
                </Button>
                <div id="header">
                    <div>
                        {this.props.tribeInfo.Tribe}
                    </div>
                </div>
                <div id="contain">
                    <div id="scroll">
                        <Scroll>

                            {this.props.tribeInfo.hasOwnProperty("Image") &&
                                <div id="imgBox">
                                    <img id="img" alt={this.props.tribeInfo ? this.props.tribeInfo.Tribe : null} src={this.props.tribeInfo.Image[0].thumbnails.large.url} />
                                    {this.props.tribeInfo.hasOwnProperty('Image Description') &&
                                        <div id="infoText">{this.props.tribeInfo['Image Description']}</div>
                                    }
                                </div>
                            }

                            <div id="Accordion" role="tablist" aria-multiselectable="true" >

                                    <div>
                                    <h4 id="toggler1" style={{ marginBottom: '1rem' }}><a>Origin Story</a></h4>
                                    <UncontrolledCollapse toggler="#toggler1">
                                      <Card>
                                        <CardBody>
                                        {this.addParagraph(this.props.tribeInfo['Origin Story'])}
                                        </CardBody>
                                      </Card>
                                    </UncontrolledCollapse>
                                  </div>

                                  <div>
                                  <h4 id="toggler2" style={{ marginBottom: '1rem' }}><a>Early History (Before 1800)</a></h4>
                                  <UncontrolledCollapse toggler="#toggler2">
                                    <Card>
                                      <CardBody>
                                      {this.addParagraph(this.props.tribeInfo['Before 1804'])}
                                      </CardBody>
                                    </Card>
                                  </UncontrolledCollapse>
                                </div>

                                <div>
                                <h4 id="toggler3" style={{ marginBottom: '1rem' }}><a>Around the time of Lewis & Clark (1804-1806)</a></h4>
                                <UncontrolledCollapse toggler="#toggler3">
                                  <Card>
                                    <CardBody>
                                    {this.addParagraph(this.props.tribeInfo['1804-1806'])}
                                    </CardBody>
                                  </Card>
                                </UncontrolledCollapse>
                              </div>

                              <div>
                              <h4 id="toggler4" style={{ marginBottom: '1rem' }}><a>Modern History</a></h4>
                              <UncontrolledCollapse toggler="#toggler4">
                                <Card>
                                  <CardBody>
                                  {this.addParagraph(this.props.tribeInfo['1806-Present'])}
                                  </CardBody>
                                </Card>
                              </UncontrolledCollapse>
                            </div>

                            <div>
                            <h4 id="toggler" style={{ marginBottom: '1rem' }}><a>Present Day</a></h4>
                            <UncontrolledCollapse toggler="#toggler">
                              <Card>
                                <CardBody>
                                {this.addParagraph(this.props.tribeInfo['Present'])}
                                </CardBody>
                              </Card>
                            </UncontrolledCollapse>
                          </div>

                          <div>
                          <h4 id="toggler5" style={{ marginBottom: '1rem' }}><a>Language</a></h4>
                          <UncontrolledCollapse toggler="#toggler5">
                            <Card>
                              <CardBody>
                              {this.addParagraph(this.props.tribeInfo['Language'])}
                              </CardBody>
                            </Card>
                          </UncontrolledCollapse>
                        </div>

                        <div>
                        <h4 id="toggler6" style={{ marginBottom: '1rem' }}><a>Religion & Culture</a></h4>
                        <UncontrolledCollapse toggler="#toggler6">
                          <Card>
                            <CardBody>
                            {this.addParagraph(this.props.tribeInfo['Religion & Culture'])}
                            </CardBody>
                          </Card>
                        </UncontrolledCollapse>
                        </div>
                            </div>
                            {this.props.tribeInfo.hasOwnProperty("Works Cited") &&
                                <div id="sec">
                                    <div><strong>Works Cited</strong></div> {this.addParagraph(this.props.tribeInfo['Works Cited'])}
                                </div>
                            }

                            {this.props.tribeInfo.hasOwnProperty('Image Citation') &&
                                <div id="sec">
                                    <div><strong>Image source:</strong></div> {this.addParagraph(this.props.tribeInfo['Image Citation'])}
                                </div>
                            }


                        </Scroll>
                    </div>
                </div>
            </div >

        );
    }

    render() {
        return (
            this.props.showSidebarTribe ? this.renderSidebarTribe() : null
        )
    }
}
