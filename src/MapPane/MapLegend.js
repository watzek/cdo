import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import './MapLegend.css'
import { MapControl } from 'react-leaflet';

const categories = ['Geographic Feature', 'Corps Relations', 'Native American Encounter'
                    , 'Important Campsite','Natural History']

const marker_colors = ['icon_yellow.svg','icon_gray.svg','icon_pink.svg',
                    'icon_green.svg','icon_blue.svg', 'map-marker-icon.png']



export default class MapLegend extends MapControl {

  renderCategories(){
    var js = []

    for(var i=0;i<5;i++){

      js.push(
        <div>  <img id="icons" alt="icon" src={marker_colors[i]}/> {categories[i]} </div>
      )

    }
    return js
  }

  componentWillMount() {
    const centerControl = L.control({position: 'bottomright'});
    //TODO:
    //make a minimize button for the legend, and a corresponding reopen button
    //for when it's closed.
    //maybe make legend background same papyrus ?

    const jsx = (
      <div id="legend">

        {this.renderCategories()}
      </div>
    );

    centerControl.onAdd = function (map) {
      let div = L.DomUtil.create('div', '');
      ReactDOM.render(jsx, div);
      return div;
    };

    this.leafletElement = centerControl;
  }





}
