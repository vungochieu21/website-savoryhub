"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* FIX ICON MARKER (Next.js) */
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

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

export default function MapFoodFree() {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // 👈 QUAN TRỌNG FIX SSR window error

  return (
    <section style={{ padding: "60px 40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2 style={{ fontSize: "32px", fontWeight: 700, marginBottom: 20 }}>
        🍜 Bản đồ quán ăn
      </h2>

      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <MapContainer
          center={[10.7769, 106.7009]}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution=""
          />

          {places.map((place, i) => {
            const open = isOpen(place.open, place.close);

            return (
              <Marker
                key={i}
                position={[place.lat, place.lng]}
                eventHandlers={{
                  click: () => setSelected(place),
                }}
              >
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

      <style jsx global>{`
        .leaflet-control-attribution {
          display: none !important;
        }
      `}</style>
    </section>
  );
}