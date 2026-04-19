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

type Place = {
  name: string;
  address: string;
  phone: string;
  time: string;
  distance: string;
  tags: string[];
  city: string;
};

const data: Place[] = [
  {
    name: "Phở Hòa Pasteur",
    address: "260C Pasteur, Quận 3",
    phone: "0901 123 456",
    time: "06:00 - 22:00",
    distance: "1.5 km",
    tags: ["Phở", "Ăn tại chỗ"],
    city: "hcm",
  },
  {
    name: "Bún Bò Huế Đông Ba",
    address: "110 Nguyễn Du, Quận 1",
    phone: "0902 234 567",
    time: "07:00 - 21:00",
    distance: "2.3 km",
    tags: ["Bún bò"],
    city: "hcm",
  },
  {
    name: "Cơm Tấm Ba Ghiền",
    address: "Phú Nhuận",
    phone: "0903 345 678",
    time: "09:00 - 22:00",
    distance: "3.8 km",
    tags: ["Cơm tấm"],
    city: "hcm",
  },
  {
    name: "Bánh Mì Huỳnh Hoa",
    address: "Quận 1",
    phone: "0904 456 789",
    time: "14:00 - 23:00",
    distance: "1.8 km",
    tags: ["Bánh mì"],
    city: "hcm",
  },
  {
    name: "Lẩu Dê",
    address: "Quận 3",
    phone: "0905 567 890",
    time: "17:00 - 00:00",
    distance: "4.5 km",
    tags: ["Lẩu"],
    city: "other",
  },
  {
    name: "Hải Sản 5 Cua",
    address: "Quận 7",
    phone: "0906 678 901",
    time: "10:00 - 23:00",
    distance: "6.2 km",
    tags: ["Hải sản"],
    city: "other",
  },
];

export default function NearbyRestaurant() {
  const [filter, setFilter] = useState("all");
  const [ratings, setRatings] = useState<string[]>([]);

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
      {/* HEADER */}
      <div className={`${styles.container} ${styles.header}`}>
        <h2>Tìm quán ăn gần bạn</h2>
        <p>Địa điểm ăn uống xung quanh bạn</p>

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
                ? "Tất cả"
                : key === "hcm"
                ? "TP.HCM"
                : "Khác"}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className={`${styles.container} ${styles.grid}`}>
        {filtered.map((item, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.distance}>{item.distance}</div>

            <h3>{item.name}</h3>

            <div className={styles.rating}>
              <FaStar />
              <span>{ratings[i] || "4.5"}</span>
            </div>

            <p className={styles.info}>
              <FaMapMarkerAlt /> {item.address}
            </p>

            <p className={styles.info}>
              <FaPhone /> {item.phone}
            </p>

            <p className={styles.info}>
              <FaClock /> {item.time}
            </p>

            <div className={styles.tags}>
              {item.tags.map((tag, idx) => (
                <span key={idx}>{tag}</span>
              ))}
            </div>

            <div className={styles.actions}>
              <button className={styles["btn-outline"]}>
                <FaDirections /> Chỉ đường
              </button>

              <button className={styles["btn-primary"]}>
                <FaPhone /> Gọi
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}