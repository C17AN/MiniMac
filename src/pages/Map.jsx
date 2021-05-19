import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import PostTemplate from "../components/PostTemplate/PostTemplate"
import ReactMapGL, { Source, Layer } from "react-map-gl"
import "../styles/pages/Map.scss"
import styled from "styled-components"
import mapData from "../mapData.json"

const geojson = 0

const layerStyle = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
}

function Map({ data, location }) {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.599361,
    longitude: 126.865111,
    zoom: 6,
  })

  const mapTokenA = "pk.eyJ1Ijoic3BhY2VzYW5nc29"
  const mapTokenB = "vIiwiYSI6ImNrb3Y0M254djA0M"
  const mapTokenC = "zAyd21zejFnM2gzMXIifQ.NBIjcZX-QL5GAKj_e-jnEQ"

  const Title = styled.div`
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 1rem;
  `

  return (
    <Layout location={location}>
      <PostTemplate classAlias="Map">
        <Title>🛤 Footprints 🐾</Title>
        <ReactMapGL
          {...viewport}
          width="90%"
          height="80%"
          mapboxApiAccessToken={mapTokenA + mapTokenB + mapTokenC}
          onViewportChange={nextViewport => setViewport(nextViewport)}
        >
          <Source id="my-data" type="geojson" data={mapData}>
            <Layer {...layerStyle} />
          </Source>
        </ReactMapGL>
      </PostTemplate>
    </Layout>
  )
}

export default Map
