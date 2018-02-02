import Leaflet from 'leaflet'


export function LayerStyle(name){
    switch(name){
      case 'biomes': return biomeStyle
      case 'poi': return POIStyle
      case 'trail': return trailStyle
      default: return null
    }
  }

  var context = null // augment scope of context

export function OnEachFeature(name,cntxt){
  context = cntxt
  switch(name){
    case 'biomes': return onEachBiome
    case 'poi': return onEachPOI
    case 'trail': return onEachTrail
    default: return null
  }
}

function POIStyle(feature){
}

function trailStyle(feature){
  if(feature.properties.JOURNEY==='OUTBOUND')
  return {color: '#0000ff', opacity: context.props.activeTrail==='outbound'? 1 : 0 }
  if(feature.properties.JOURNEY==='RETURN')
  return {color: '#ff0000', opacity: context.props.activeTrail==='return'? 1 : 0 }
  if(feature.properties.JOURNEY==='OUTBOUND AND RETURN')
  return {color: context.props.activeTrail==='outbound'? '#0000ff' : '#ff0000'}
  console.log(feature)
}

function biomeStyle(feature){
  //let biomes_color = biomes => ('#'+(10*biomes).toString(16)+(25*biomes).toString(16)+(10*biomes).toString(16))
  var color = '#000000'
  if(feature.properties.ECO_NAME.indexOf('forest')>=0||feature.properties.ECO_NAME.indexOf('pine')>=0
  ||feature.properties.ECO_NAME.indexOf('everglades')>=0)
    color = '#11dd11'
  if(feature.properties.ECO_NAME.indexOf('shrub')>=0||feature.properties.ECO_NAME.indexOf('steppe')>=0
  ||feature.properties.ECO_NAME.indexOf('chaparral')>=0)
    color = '#fcea9c'
  if(feature.properties.ECO_NAME.indexOf('grassland')>=0||feature.properties.ECO_NAME.indexOf('prairies')>=0
  ||feature.properties.ECO_NAME.indexOf('savanna')>=0)
    color = '#aae570'
  if(feature.properties.ECO_NAME.indexOf('desert')>=0||feature.properties.ECO_NAME.indexOf('mezquital')>=0)
    color = '#f2f4c8'
  return { fillColor: color, fillOpacity: 0.3, stroke: false}
}

function onEachBiome(feature,layer){
  layer.bindPopup(feature.properties.ECO_NAME)
}

function onEachPOI(feature,layer){
  //layer.bindPopup(feature.properties.Name)
  layer.on({click: ()=>(context.props.changePane('info',feature.properties))})

  //console.log(feature)
}

function onEachTrail(feature,layer){
  layer.on({click: ()=>(console.log(feature.properties))})

}
