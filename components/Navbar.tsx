"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LocationSelect from "./LocaSelect";

export default function Navbar() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("explore");
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [lang, setLang] = useState("vi");

  const [foods, setFoods] = useState<string[]>([]);
  const [result, setResult] = useState<string[]>([]);
  const [searched, setSearched] = useState(false);

  const data = ["Phở", "Bún bò", "Cơm tấm"];

  const handleSearch = () => {
    const res = data.filter(item =>
      item.toLowerCase().includes(search.toLowerCase())
    );
    setResult(res);
    setSearched(true);
  };

  const flags: any = {
    vi: "🇻🇳",
    en: "🇺🇸",
    jp: "🇯🇵"
  };

  return (
    <div style={{ fontFamily: "Arial" }}>
      
      {/* 🔹 Top bar */}
      <div style={{
        display: "flex",
        background: "#1f4e79",
        color: "white",
        justifyContent: "center"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex"
        }}>
          
          {/* Khám phá */}
          <div
            onClick={() => setActiveTab("explore")}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              background: activeTab === "explore" ? "#e9e9e9" : "transparent",
              color: activeTab === "explore" ? "black" : "white"
            }}
          >
            Khám phá
          </div>

          {/* Đặt hàng */}
          <div
            onClick={() => {
              setActiveTab("Shopee");
                window.open("https://shopeefood.vn/", "_blank"); // mở tab mới
            }}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Đặt hàng
          </div>
        </div>
      </div>

      {/* 🔹 Main header */}
      <div style={{
        background: dark ? "#1e1e1e" : "#e9e9e9",
        display: "flex",
        justifyContent: "center",
        color: dark ? "#ddd" : "black",
        position: "relative"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          gap: "10px",
          width: "100%",
          maxWidth: "1200px"
        }}>
          <button>☰</button>

          <div style={{
            color: "#1f4e79",
            fontWeight: "bold",
            fontSize: "20px"
          }}>
            LOGO
          </div>

          <LocationSelect />

          {/* 🔍 SEARCH */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Địa điểm, món ăn..."
            style={{
              flex: 1,
              padding: "8px",
              border: "none",
              outline: "none",
              background: "#fff",
              color: "#333"
            }}
          />

          <button onClick={handleSearch}>🔍</button>

          {/* ⚙️ FILTER */}
          <button onClick={() => setShowFilter(!showFilter)}>
            ⚙️ Bộ lọc
          </button>

          {/* LOGIN */}
          <button style={{ color: "black" }}>
            Đăng nhập
          </button>

          {/* DARK MODE */}
          <button onClick={() => setDark(!dark)}>
            {dark ? "🌙" : "☀️"}
          </button>

          {/* ADD FOOD */}
          <button onClick={() => {
            const newFood = prompt("Nhập món ăn:");
            if (newFood) setFoods([...foods, newFood]);
          }}>
            ➕
          </button>

          {/* LANGUAGE */}
          <button onClick={() => {
            const next = lang === "vi" ? "en" : lang === "en" ? "jp" : "vi";
            setLang(next);
          }}>
            {flags[lang]}
          </button>
        </div>
      </div>
    </div>
  );
}