"use client";
import { useState } from "react";

const cities = [
  "Tp Hà Nội",
  "Tp HCM",
  "Tuyên Quang",
  "Lào Cai",
  "Thái Nguyên",
  "Phú Thọ",
  "Bắc Ninh",
  "Hưng Yên",
  "Tp Hải Phòng",
  "Ninh Bình",
  "Quảng Trị",
  "Tp Đà Nẵng",
  "Quảng Ngãi",
  "Gia Lai",
  "Khánh Hoà",
  "Lâm Đồng",
  "Đắk Lắk",
  "Đồng Nai",
  "Tây Ninh",
  "Tp Cần Thơ",
  "Vĩnh Long",
  "Đồng Tháp",
  "Cà Mau",
  "An Giang",
  "Tp Huế",
  "Lai Châu",
  "Điện Biên",
  "Sơn La",
  "Lạng Sơn",
  "Quảng Ninh",
  "Thanh Hoá",
  "Nghệ An",
  "Hà Tĩnh",
  "Cao Bằng",
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
          color: "#838282",
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
              marginBottom: "10px",
              color:"#8c8c8c",
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
                  padding: "6px",
                  cursor: "pointer",
                  color: "black",  
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#1f4e79")//màu chữ trong drop down
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "black")
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