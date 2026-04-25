"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function GoogleMapClient({ places }: any) {
  return (
    <MapContainer
      center={[10.98, 106.65]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {places.map((place: any, i: number) => (
        <div key={i}></div>
      ))}
    </MapContainer>
  );
}