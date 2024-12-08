'use client'
import React from 'react'
import DeckGL from '@deck.gl/react'
import { Map } from 'react-map-gl/maplibre'
import { GeoJsonLayer } from '@deck.gl/layers'

const MAP_STYLE = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";
//const MAP_STYLE = "http://server.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
//https://c.tile.openstreetmap.org/{z}/{x}/{y}.png
const DATA_URL = "http://localhost:3002/data"

const INITIAL_VIEW = {
  latitude: 21.88234,
  longitude: -102.28259,
  zoom: 9
};

export default function Visualizer() {

  const layers = [
    new GeoJsonLayer({
      id: "geo-json",
      data: DATA_URL,
      stroked: false,
      filled: true,
      pickable: true,
      getFillColor: [160, 160, 180, 200],
      getPointRadius: 40,
    }),
  ];

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
      <DeckGL
        initialViewState={INITIAL_VIEW}
        controller
        layers = {layers}
      >
        <Map
          reuseMaps
          controller
          mapStyle={MAP_STYLE}
        />
      </DeckGL>
    </div>
  );
}
