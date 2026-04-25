"use client";

import { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaDirections,
  FaStar,
} from "react-icons/fa";

import styles from "./NearbyRestaurant.module.css";
import { useLanguage } from "src/locales/context/LanguageContext";

/* 🔥 MULTI LANG */
type MultiLang = {
  vi: string;
  en: string;
};

type Place = {
  name: MultiLang;
  address: MultiLang;
  phone: string;
  time: MultiLang;
  distance: string;
  tags: MultiLang[];
  city: string;

  /* ✅ ADD LAT LNG */
  lat: number;
  lng: number;
};

/* DATA */
const data: Place[] = [
  {
    name: { vi: "Phở Hòa Pasteur", en: "Pho Hoa Pasteur" },
    address: { vi: "260C Pasteur, Quận 3", en: "260C Pasteur, District 3" },
    phone: "0901 123 456",
    time: { vi: "06:00 - 22:00", en: "06:00 - 22:00" },
    distance: "1.5 km",
    tags: [
      { vi: "Phở", en: "Pho" },
      { vi: "Ăn tại chỗ", en: "Dine-in" },
    ],
    city: "hcm",
    lat: 10.7797,
    lng: 106.6990,
  },
  {
    name: { vi: "Bún Bò Huế Đông Ba", en: "Hue Beef Noodle Dong Ba" },
    address: { vi: "110 Nguyễn Du, Quận 1", en: "110 Nguyen Du, District 1" },
    phone: "0902 234 567",
    time: { vi: "07:00 - 21:00", en: "07:00 - 21:00" },
    distance: "2.3 km",
    tags: [{ vi: "Bún bò", en: "Beef noodle" }],
    city: "hcm",
    lat: 10.7765,
    lng: 106.7009,
  },
  {
    name: { vi: "Cơm Tấm Ba Ghiền", en: "Ba Ghien Broken Rice" },
    address: { vi: "Phú Nhuận", en: "Phu Nhuan" },
    phone: "0903 345 678",
    time: { vi: "09:00 - 22:00", en: "09:00 - 22:00" },
    distance: "3.8 km",
    tags: [{ vi: "Cơm tấm", en: "Broken rice" }],
    city: "hcm",
    lat: 10.7991,
    lng: 106.6767,
  },
  {
    name: { vi: "Bánh Mì Huỳnh Hoa", en: "Huynh Hoa Banh Mi" },
    address: { vi: "Quận 1", en: "District 1" },
    phone: "0904 456 789",
    time: { vi: "14:00 - 23:00", en: "14:00 - 23:00" },
    distance: "1.8 km",
    tags: [{ vi: "Bánh mì", en: "Banh mi" }],
    city: "hcm",
    lat: 10.7723,
    lng: 106.6981,
  },
  {
    name: { vi: "Lẩu Dê", en: "Goat Hotpot" },
    address: { vi: "Quận 3", en: "District 3" },
    phone: "0905 567 890",
    time: { vi: "17:00 - 00:00", en: "17:00 - 00:00" },
    distance: "4.5 km",
    tags: [{ vi: "Lẩu", en: "Hotpot" }],
    city: "other",
    lat: 10.7802,
    lng: 106.6905,
  },
  {
    name: { vi: "Hải Sản 5 Cua", en: "5 Cua Seafood" },
    address: { vi: "Quận 7", en: "District 7" },
    phone: "0906 678 901",
    time: { vi: "10:00 - 23:00", en: "10:00 - 23:00" },
    distance: "6.2 km",
    tags: [{ vi: "Hải sản", en: "Seafood" }],
    city: "other",
    lat: 10.7297,
    lng: 106.7216,
  },
];

/* GOOGLE MAP LINK */
function getMapLink(lat: number, lng: number) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export default function NearbyRestaurant() {
  const [filter, setFilter] = useState("all");
  const [ratings, setRatings] = useState<string[]>([]);
  const { t, lang } = useLanguage();

  const currentLang: "vi" | "en" = lang === "en" ? "en" : "vi";

  useEffect(() => {
    const r = data.map(() =>
      (Math.random() * 1.5 + 3.5).toFixed(1)
    );
    setRatings(r);
  }, []);

  const filtered =
    filter === "all"
      ? data
      : data.filter((item) => item.city === filter);

  return (
    <section className={styles.section}>
      <div className={`${styles.container} ${styles.header}`}>
        <h2>{t("nearby_title")}</h2>
        <p>{t("nearby_subtitle")}</p>

        <div className={styles.filter}>
          {["all", "hcm", "other"].map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`${styles["filter-btn"]} ${
                filter === key ? styles.active : ""
              }`}
            >
              {key === "all"
                ? t("filter_all")
                : key === "hcm"
                ? t("filter_hcm")
                : t("filter_other")}
            </button>
          ))}
        </div>
      </div>

      <div className={`${styles.container} ${styles.grid}`}>
        {filtered.map((item, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.distance}>{item.distance}</div>

            <h3>{item.name[currentLang]}</h3>

            <div className={styles.rating}>
              <FaStar />
              <span>{ratings[i] || "4.5"}</span>
            </div>

            <p className={styles.info}>
              <FaMapMarkerAlt /> {item.address[currentLang]}
            </p>

            <p className={styles.info}>
              <FaPhone /> {item.phone}
            </p>

            <p className={styles.info}>
              <FaClock /> {item.time[currentLang]}
            </p>

            <div className={styles.tags}>
              {item.tags.map((tag, idx) => (
                <span key={idx}>{tag[currentLang]}</span>
              ))}
            </div>

            <div className={styles.actions}>
              <a
                href={getMapLink(item.lat, item.lng)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["btn-outline"]}
              >
                <FaDirections /> {t("direction")}
              </a>

              <button className={styles["btn-primary"]}>
                <FaPhone /> {t("call")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}