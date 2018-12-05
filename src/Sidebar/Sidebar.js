/*
Sidebar.js is a react component that comprises the sidebar, which shows
information about a waypoint on the map once it's clicked. Should be
pretty straightforward, its render method renders the sidebar in JSX
like any React component and there is a hefty amount of CSS associated with
this component.

The scroll functionality comes from an npm library called 'react-awesome-scroll'
*/

import * as React from 'react';
import {Button } from 'reactstrap';
import Scroll from 'react-awesome-scroll';
import './Sidebar.css';

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.reformatDate = this.reformatDate.bind(this);
	}

	//makes date look better
	reformatDate(date) {
		let date2 = date.split('-');
		return `${months[date2[1] - 1]} ${date2[2]}, ${date2[0]} \n`;
	}

	//uses regex to restyle citations on each sidebar (fix to be chicago journal citation style)
	reformatCitation(parse, type){
		var result = []
		var ita = " ";
		if(type === "mla"){ //stil broken
			const reg = /(.*?)\./gm;
			let m;
			var i = 0;
			while (m = reg.exec(parse)) {
				if(i === 2 && m[1] != null) ita = m[1];
				i++;
			}
		}

		if(type === "chi"){
		 	const reg = /,(.*?)\./gm;
			result = reg.exec(parse);
			ita = result[1];
		}

		var start = parse.indexOf(ita);
		var end = start + ita.length;
		ita = "<em>" + ita + "</em>";

		var final = parse.substring(0, start) + ita + parse.substring(end);

		return (
			<span dangerouslySetInnerHTML={{ __html: final }}></span>
		);
	}

	renderSidebar() {
		return (
			<div className="Sidebar position-absolute">

				<Button
					aria-label="Next"
					onClick={() => this.props.changeWaypoint(this.props.paneInfo.WaypointID)}
					id="tour">

					<span aria-hidden="true">next</span>
				</Button>

				<Button
					color="danger"
					className="close"
					aria-label="Close"
					onClick={this.props.toggleLayers}
					id="exit">
					<span aria-hidden="true">&times;</span>
				</Button>

				<div id="header">
					<div>
						{this.props.paneInfo ? this.props.paneInfo.Name : null}

						<div id="prettyDate">
							{this.props.paneInfo
								? this.reformatDate(this.props.paneInfo.Date)
								: null}
						</div>

						<div id="coords">
							{this.props.paneInfo.latitude + "°N " + this.props.paneInfo.longitude + "°W"}
						</div>
					</div>
				</div>

				<div id="contain">
					<div id="scroll">
						<Scroll>
							{this.props.paneInfo.hasOwnProperty("Picture") &&
								<div id="imgBox">
									<img id="img" alt={this.props.paneInfo ? this.props.paneInfo.Name : null} src={this.props.paneInfo.Picture[0].thumbnails.large.url} />
									{this.props.paneInfo.hasOwnProperty('Image description') &&
										<div id="infoText">{this.props.paneInfo['Image description']}</div>
									}
								</div>
							}
							<div id="txt">
								{this.props.paneInfo ? this.props.paneInfo.Synopsis : null}
							</div>
							<div id="link">
								<a
									onClick={() =>
										window.open(this.props.paneInfo['Journal Entries'], '')
									}
									>
									{this.props.paneInfo['Journal Entries']
										? 'Journal Entry'
										: null}
								</a>
							</div>
							{this.props.paneInfo.hasOwnProperty("Secondary Source") &&
								<div id="sec">
									<div><strong>Further Reading:</strong></div> {this.reformatCitation(this.props.paneInfo['Secondary Source'], "chi")}
								</div>
							}

							{this.props.paneInfo.hasOwnProperty('Image citation') &&
								<div id="sec">
									<div><strong>Image source:</strong></div> {this.reformatCitation(this.props.paneInfo['Image citation'], "mla")}
								</div>
							}
						</Scroll>
					</div>
				</div>
			</div>
		);
	}

	render() {
		return this.props.showSidebar ? this.renderSidebar() : null;
	}
}
