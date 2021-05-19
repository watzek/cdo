/*
SidebarTribe.js is a react component that comprises the sidebar for the tribe profiles. 
It shows information about each tribe when they are clicked on. 
*/
import React, { } from "react";
import { Button } from 'reactstrap';
import Scroll from 'react-awesome-scroll';
import './Sidebar.css';

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>


export default class SidebarTribe extends React.Component {

    constructor(props) {
        super(props);
        this.addParagraph = this.addParagraph.bind(this);
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
                                <div class="panel panel-default" >
                                    <div class="panel-heading" role="tab" id="HeadingOne" >
                                        <h4 class="panel-title">
                                            <a class="collapsed" data-toggle="collapse" data-parent="#Accordion" href="#CollapseOne" aria-expanded="true" aria-controls="CollapseOne" >
                                                Origin Story
        					</a>
                                        </h4>
                                    </div>

                                    <div id="CollapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="HeadingOne">

                                        {this.addParagraph(this.props.tribeInfo['Origin Story'])}

                                    </div>
                                </div>

                                <div class="panel panel-default">
                                    <div class="panel-heading" role="tab" id="HeadingTwo">
                                        <h4 class="panel-title">
                                            <a class="collapsed" data-toggle="collapse" data-parent="#Accordion" href="#CollapseTwo" aria-expanded="false" aria-controls="CollapseTwo" >
                                                Early History (Before 1800)
        					</a>
                                        </h4>
                                    </div>

                                    <div id="CollapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="HeadingTwo">

                                        {this.addParagraph(this.props.tribeInfo['Before 1804'])}
                                    </div>
                                </div>

                                <div class="panel panel-default">
                                    <div class="panel-heading" role="tab" id="HeadingThree">
                                        <h4 class="panel-title">
                                            <a class="collapsed" data-toggle="collapse" data-parent="#Accordion" href="#CollapseThree" aria-expanded="false" aria-controls="CollapseThree" >
                                                Around the time of Lewis & Clark (1804-1806)
        					</a>
                                        </h4>
                                    </div>

                                    <div id="CollapseThree" class="panel-collapse collapse show" role="tabpanel" aria-labelledby="HeadingThree">
                                        {this.addParagraph(this.props.tribeInfo['1804-1806'])}
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading" role="tab" id="HeadingFour">
                                        <h4 class="panel-title">
                                            <a class="collapsed" data-toggle="collapse" data-parent="#Accordion" href="#CollapseFour" aria-expanded="false" aria-controls="CollapseFour" >
                                                Modern History
        					</a>
                                        </h4>
                                    </div>

                                    <div id="CollapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="HeadingFour">
                                        {this.addParagraph(this.props.tribeInfo['1806-Present'])}
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading" role="tab" id="HeadingFive">
                                        <h4 class="panel-title">
                                            <a class="collapsed" data-toggle="collapse" data-parent="#Accordion" href="#CollapseFive" aria-expanded="false" aria-controls="CollapseFive">
                                                Present Day
        					</a>
                                        </h4>
                                    </div>

                                    <div id="CollapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="HeadingFive">
                                        {this.addParagraph(this.props.tribeInfo['Present'])}
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading" role="tab" id="HeadingSix">
                                        <h4 class="panel-title">
                                            <a class="collapsed" data-toggle="collapse" data-parent="#Accordion" href="#CollapseSix" aria-expanded="false" aria-controls="CollapseSix" >
                                                Language
        					</a>
                                        </h4>
                                    </div>

                                    <div id="CollapseSix" class="panel-collapse collapse" role="tabpanel" aria-labelledby="HeadingSix">
                                        {this.addParagraph(this.props.tribeInfo['Language'])}
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading" role="tab" id="HeadingSeven">
                                        <h4 class="panel-title">
                                            <a class="collapsed" data-toggle="collapse" data-parent="#Accordion" href="#CollapseSeven" aria-expanded="false" aria-controls="CollapseSeven" >
                                                Religion & Culture
        					</a>
                                        </h4>
                                    </div>

                                    <div id="CollapseSeven" class="panel-collapse collapse" role="tabpanel" aria-labelledby="HeadingSeven">
                                        {this.addParagraph(this.props.tribeInfo['Religion & Culture'])}
                                    </div>
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

