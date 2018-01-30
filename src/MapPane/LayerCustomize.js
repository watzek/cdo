
export function LayerStyle(name){
      if(name!=='biomes')return null
      let biomes_style = feature => ({ fillColor: biomes_color(feature.properties.BIOME), fillOpacity: 0.3, stroke: false})
      let biomes_color = biomes => ('#'+(10*biomes).toString(16)+(25*biomes).toString(16)+(10*biomes).toString(16))
      return biomes_style
  }

export function OnEachFeature(name,context){
  console.log(context.props)
return (feature, layer) => (layer.bindPopup(feature.properties.ECO_NAME+" "+feature.properties.ECO_NUM))
}
