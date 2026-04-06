"use client";
import { useState } from "react";

const cities = [
  "TP.HCM",
  "Hà Nội",
  "Đà Nẵng",
  "Cần Thơ",
  "Vũng Tàu",
  "Huế",
  "Nha Trang"
];
export default function LocationSelect() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("TP.HCM");
  const [search, setSearch] = useState("");
  const filtered = cities.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div style={{ position: "relative", width: "180px" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: "6px 10px",
          borderRadius: "5px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#d50101",
                }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "black")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#5c5c5c")}
      >
        {selected}
        <span>▼</span> {/* icon mũi tên */}
      </div>

      {open && (   //bảng drop down
        <div style={{
          position: "absolute",
          top: "40px",
          width: "100%",
          background: "White",
          border: "1px solid #7c7c7c", //màu khung dropdown
          borderRadius: "3px",
          padding: "10px",
          zIndex: 1000
        }}>
          <input
            placeholder="Tìm tỉnh..."    //thanh tìm tỉnh
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "5px",
              marginBottom: "10px"
            }}
          />
          <div style={{ maxHeight: "150px", overflowY: "auto" }}>
            {filtered.map((city, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelected(city);
                  setOpen(false);
                }}
                style={{
                  padding: "5px",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#1f4e79")//màu chữ trong drop down
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "white")
                }
              >
                {city}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}