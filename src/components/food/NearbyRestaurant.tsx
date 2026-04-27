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
  lat: number;
  lng: number;

  /* ✅ optional */
  placeId?: string;
};

/* DATA */
const data: Place[] = [
  {
    name: { vi: "NHÀ HÀNG NGON", en: "DELICIOUS RESTAURANT" },
    address: { vi: "160 Pasteur, Bến Nghé, Sài Gòn, Hồ Chí Minh", en: "160 Pasteur Street, Ben Nghe Ward, Saigon, Ho Chi Minh City" },
    phone: "0901 123 456",
    time: { vi: "06:00 - 22:00", en: "06:00 - 22:00" },
    distance: "1.5 km",
    tags: [
      { vi: "Đa dạng", en: "Diversity" },
      { vi: "Ăn tại chỗ", en: "Dine-in" },
      { vi: "Đồ ăn mang đi", en: "Takeaway food" }
    ],
    city: "hcm",
    lat: 10.777481,
    lng: 106.6892627,
  },
  {
    name: { vi: "Ben Nghe Street Food", en: "Ben Nghe Street Food" },
    address: { vi: "134 Nam Kỳ Khởi Nghĩa, Bến Nghé, Sài Gòn, Hồ Chí Minh", en: "134 Nam Ky Khoi Nghia Street, Ben Nghe Ward, Saigon, Ho Chi Minh City" },
    phone: "0902 234 567",
    time: { vi: "07:00 - 21:00", en: "07:00 - 21:00" },
    distance: "2.3 km",
    tags: [
      { vi: "Bánh mì", en: "Banh mi" },
      { vi: "Kem", en: "Ice Cream" },
      { vi: "Ăn tại chỗ", en: "Dine-in" },
      { vi: "Đồ ăn mang đi", en: "Takeaway food" }
    ],
    city: "hcm",
    lat: 10.7822308,
    lng: 106.5861368,
    
  },
  {
    name: { vi: "Hoàng's Kitchen", en: "Hoang's Kitchen" },
    address: { vi: "45 Thủ Khoa Huân, Bến Thành, Hồ Chí Minh", en: "45 Thu Khoa Huan Street, Ben Thanh Ward, Ho Chi Minh City" },
    phone: "0903 345 678",
    time: { vi: "09:00 - 22:00", en: "09:00 - 22:00" },
    distance: "3.8 km",
    tags: [
      { vi: "Cà phê trứng", en: "Eggcoffe" },
      { vi: "Ăn tại chỗ", en: "Dine-in" },
      { vi: "Đồ ăn mang đi", en: "Takeaway food" }
    ],    city: "hcm",
    lat: 10.7822308,
    lng: 106.5861368,
  },
  {
    name: { vi: "Bánh Mì Huỳnh Hoa", en: "Huynh Hoa Banh Mi" },
    address: { vi: "26 Lê Thị Riêng, Phường Phạm Ngũ Lão, Bến Thành, Hồ Chí Minh", en: "26 Le Thi Rieng Street, Pham Ngu Lao Ward, Ben Thanh District, Ho Chi Minh City" },
    phone: "0904 456 789",
    time: { vi: "14:00 - 23:00", en: "14:00 - 23:00" },
    distance: "1.8 km",
    tags: [
      { vi: "Bánh mì", en: "Banh mi" },
      { vi: "Nước mía", en: "Sugarcane Juice" },
      { vi: "Ăn tại chỗ", en: "Dine-in" },
      { vi: "Đồ ăn mang đi", en: "Takeaway food" }
    ],
    city: "hcm",
    lat: 10.7715226,
    lng: 106.6876332,
  },
  {
    name: { vi: "Lẩu Dê Gia Truyền Tài Ký", en: "Traditional Goat Hot Pot by Tai Ky" },
    address: { vi: "57A Đ. Ung Văn Khiêm, Phường 25, Thạnh Mỹ Tây, Hồ Chí Minh", en: "57A Ung Van Khiem Street, Ward 25, Thanh My Tay, Ho Chi Minh City" },
    phone: "0905 567 890",
    time: { vi: "17:00 - 00:00", en: "17:00 - 00:00" },
    distance: "4.5 km",
    tags: [
      { vi: "Lẩu dê", en: "Goat hotpot" },
      { vi: "Tiết canh", en: "Blood pudding" },
      { vi: "Ăn tại chỗ", en: "Dine-in" },
      { vi: "Đồ ăn mang đi", en: "Takeaway food" }
    ],
    city: "other",
    lat: 10.8316887,
    lng: 106.7024567,
  },
  {
    name: { vi: "Nhà Hàng Hải Sản Thiên Nhiên", en: "Thien Nhien Seafood Restaurant" },
    address: { vi: "1072 Kha Vạn Cân, Linh Chiểu, Thủ Đức", en: "1072 Kha Van Can Street, Linh Chieu Ward, Thu Duc District" },
    phone: "0906 678 901",
    time: { vi: "10:00 - 23:00", en: "10:00 - 23:00" },
    distance: "6.2 km",
     tags: [
      { vi: "hải sản", en: "Sea food" },
      { vi: "Lẩu cá", en: "Fish hotpot" },
      { vi: "Ăn tại chỗ", en: "Dine-in" },
      { vi: "Đồ ăn mang đi", en: "Takeaway food" }
    ],
    city: "other",
    lat: 10.8571958,
    lng: 106.4523174,
  },
];

/* 🔥 GOOGLE MAP LINK */
function getMapLink(
  name: string,
  lat: number,
  lng: number,
  placeId?: string
) {
  if (placeId && placeId.startsWith("ChIJ")) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${placeId}`;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    name
  )}@${lat},${lng}`;
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
                href={getMapLink(
                  item.name.vi,
                  item.lat,
                  item.lng,
                  item.placeId
                )}
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