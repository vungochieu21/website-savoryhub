"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "./GoogleMap.module.css";

/* DATA */
const places = [
  { name: "Phở Hòa Pasteur", lat: 10.7829, lng: 106.6963, open: "06:00", close: "22:00" },
  { name: "Bún Bò Huế Đông Ba", lat: 10.7765, lng: 106.7009, open: "07:00", close: "21:00" },
  { name: "Cơm Tấm Ba Ghiền", lat: 10.7991, lng: 106.6767, open: "09:00", close: "22:00" },
  { name: "Bánh Mì Huỳnh Hoa", lat: 10.7723, lng: 106.6981, open: "14:00", close: "23:00" },
  { name: "Lẩu Dê", lat: 10.7802, lng: 106.6905, open: "17:00", close: "02:00" },
];

function isOpen(open: string, close: string) {
  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();

  const [oH, oM] = open.split(":").map(Number);
  const [cH, cM] = close.split(":").map(Number);

  const openTime = oH * 60 + oM;
  const closeTime = cH * 60 + cM;

  if (closeTime < openTime) {
    return current >= openTime || current <= closeTime;
  }

  return current >= openTime && current <= closeTime;
}

/* MAP INNER */
function MapInner() {
  const [Leaflet, setLeaflet] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      import("leaflet"),
      import("react-leaflet"),
      import("leaflet/dist/leaflet.css"),
    ]).then(([L, RL]) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      setLeaflet({
        L,
        ...RL,
      });
    });
  }, []);

  if (!Leaflet) return null;

  const { MapContainer, TileLayer, Marker, Popup } = Leaflet;

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>
        🍜 Bản đồ quán ăn
      </h2>

      <div className={styles.mapBox}>
        <MapContainer
          center={[10.7769, 106.7009]}
          zoom={13}
          className={styles.map}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {places.map((place, i) => {
            const open = isOpen(place.open, place.close);

            return (
              <Marker key={i} position={[place.lat, place.lng]}>
                <Popup>
                  <div style={{ fontSize: "14px" }}>
                    <b>{place.name}</b>
                    <br />
                    ⏰ {place.open} - {place.close}
                    <br />
                    Trạng thái:{" "}
                    <b style={{ color: open ? "green" : "gray" }}>
                      {open ? "Đang mở" : "Đã đóng"}
                    </b>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      <p className={styles.attribution}>
        © OpenStreetMap contributors
      </p>
    </section>
  );
}

/* EXPORT */
export default dynamic(() => Promise.resolve(MapInner), {
  ssr: false,
});