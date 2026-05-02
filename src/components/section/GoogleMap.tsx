"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "./GoogleMap.module.css";
import { useLanguage } from "src/locales/context/LanguageContext";

/* MULTI LANG */
type MultiLang = {
  vi: string;
  en: string;
};

/* DATA */
const places = [
  {
    name: { vi: "Phở Hòa Pasteur", en: "Pho Hoa Pasteur" },
    lat: 10.7829,
    lng: 106.6963,
    open: "06:00",
    close: "22:00",
  },
  {
    name: { vi: "Bún Bò Huế Đông Ba", en: "Hue Beef Noodle Dong Ba" },
    lat: 10.7765,
    lng: 106.7009,
    open: "07:00",
    close: "21:00",
  },
  {
    name: { vi: "Cơm Tấm Ba Ghiền", en: "Ba Ghien Broken Rice" },
    lat: 10.7991,
    lng: 106.6767,
    open: "09:00",
    close: "22:00",
  },
  {
    name: { vi: "Bánh Mì Huỳnh Hoa", en: "Huynh Hoa Banh Mi" },
    lat: 10.7723,
    lng: 106.6981,
    open: "14:00",
    close: "23:00",
  },
  {
    name: { vi: "Lẩu Dê", en: "Goat Hotpot" },
    lat: 10.7802,
    lng: 106.6905,
    open: "17:00",
    close: "02:00",
  },
];

/* CHECK OPEN */
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

/* CLIENT MAP */
function MapInner() {
  const [ready, setReady] = useState(false);
  const [components, setComponents] = useState<any>(null);
  const { t, lang } = useLanguage();

  const currentLang: "vi" | "en" = lang === "en" ? "en" : "vi";

  useEffect(() => {
    (async () => {
      const L = await import("leaflet");
      const RL = await import("react-leaflet");

      delete (L.Icon.Default.prototype as any)._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      setComponents({ L, ...RL });
      setReady(true);
    })();
  }, []);

  if (!ready || !components) {
    return <div>{t("loading_map")}</div>;
  }

  const { MapContainer, TileLayer, Marker, Popup } = components;

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{t("map_title")}</h2>

      <div className={styles.mapBox}>
        <MapContainer
          center={[10.7769, 106.7009]}
          zoom={13}
          className={styles.map}
          attributionControl={false}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {places.map((place, i) => {
            const open = isOpen(place.open, place.close);

            return (
              <Marker key={i} position={[place.lat, place.lng]}>
                <Popup>
                  <div
                    style={{
                      fontSize: 12,
                      lineHeight: 1.4,
                      minWidth: 160,
                    }}
                  >
                    {/* NAME */}
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>
                      {place.name[currentLang]}
                    </div>

                    {/* TIME */}
                    <div style={{ opacity: 0.7 }}>
                      ⏰ {place.open} - {place.close}
                    </div>

                    {/* STATUS */}
                    <div>
                      <span style={{ opacity: 0.7 }}>
                        {t("status")}:{" "}
                      </span>
                      <span style={{ color: open ? "green" : "gray", fontWeight: 500 }}>
                        {open ? t("open") : t("closed")}
                      </span>
                    </div>
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

/* SSR OFF */
export default dynamic(() => Promise.resolve(MapInner), {
  ssr: false,
});