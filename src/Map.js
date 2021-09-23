import React from "react";
// import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { MapContainer, TileLayer, MapConsumer, useMap } from "react-leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import { showDataOnMap } from "./util";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map({ casesType, countries, center, zoom }) {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={center} zoom={zoom} />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
}

export default Map;
