"use client";

import { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaDirections,
  FaStar,
} from "react-icons/fa";

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

export default function NearbyFood() {
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
    <section style={{ padding: "60px 0" }}>
      
      {/* HEADER */}
      <div className="container header">
        <h2>Tìm quán ăn gần bạn</h2>
        <p>Địa điểm ăn uống xung quanh bạn</p>

        <div className="filter">
          {["all", "hcm", "other"].map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className="filter-btn"
            >
              {key === "all" ? "Tất cả" : key === "hcm" ? "TP.HCM" : "Khác"}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="container grid">
        {filtered.map((item, i) => (
          <div key={i} className="card">
            
            <div className="distance">{item.distance}</div>

            <h3>{item.name}</h3>

            <div className="rating">
              <FaStar />
              <span>{ratings[i] || "4.5"}</span>
            </div>

            <p className="info">
              <FaMapMarkerAlt /> {item.address}
            </p>

            <p className="info">
              <FaPhone /> {item.phone}
            </p>

            <p className="info">
              <FaClock /> {item.time}
            </p>

            <div className="tags">
              {item.tags.map((tag, idx) => (
                <span key={idx}>{tag}</span>
              ))}
            </div>

            <div className="actions">
              <button className="btn-outline">
                <FaDirections /> Chỉ đường
              </button>

              <button className="btn-primary">
                <FaPhone /> Gọi
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CSS */}
      <style jsx>{`
        /* 🔥 CHỈ NỚI NGANG – KHÔNG ĐỔI GRID */
        .container {
          width: 100%;
          max-width: 1600px; /* 👈 NỚI RA BẰNG TRÊN */
          margin: auto;
          padding: 0 40px;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
        }

        .header h2 {
          font-size: 32px;
          font-weight: bold;
        }

        .header p {
          color: #666;
        }

        .filter {
          margin-top: 20px;
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        /* 🔥 GIỮ 3 CARD / HÀNG */
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .card {
          background: #fff;
          padding: 22px;
          border-radius: 12px;
          border: 1px solid #eee;
          position: relative;
          transition: 0.25s;
        }

        .card:hover {
          border: 1px solid red;
          transform: translateY(-5px);
        }

        .distance {
          position: absolute;
          top: 15px;
          right: 15px;
          border: 1px solid red;
          color: red;
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 12px;
        }

        .info {
          display: flex;
          gap: 8px;
          color: #555;
          margin-bottom: 4px;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 6px;
          color: orange;
          margin: 6px 0;
          line-height: 1;
        }

        .rating svg {
          font-size: 14px;
        }

        .rating span {
          font-size: 14px;
        }

        .tags {
          margin-top: 12px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tags span {
          background: #000;
          color: #fff;
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 12px;
        }

        .actions {
          display: flex;
          gap: 10px;
          margin-top: 14px;
        }

        .btn-outline {
          flex: 1;
          border: 1px solid red;
          color: red;
          background: white;
          padding: 6px 8px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
        }

        .btn-outline:hover {
          background: red;
          color: white;
        }

        .btn-primary {
          flex: 1;
          background: red;
          color: white;
          border: none;
          padding: 6px 8px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
        }

        .btn-primary:hover {
          background: #b30000;
        }

        .filter-btn {
          padding: 6px 14px;
          border-radius: 8px;
          border: 1px solid red;
          background: white;
          color: red;
          cursor: pointer;
        }

        .filter-btn:hover {
          background: red;
          color: white;
        }
      `}</style>
    </section>
  );
}