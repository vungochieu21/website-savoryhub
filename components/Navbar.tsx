"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LocationSelect from "./LocaSelect";
import NightModeButton from "./NightModeButton";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("explore");
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [lang, setLang] = useState("vi");
  const [foods, setFoods] = useState<string[]>([]);
  const router = useRouter();

  const data = ["Phở", "Bún bò", "Cơm tấm"];

  const handleSearch = () => {
    if (!search.trim()) return;
  };

  const flags: any = {
    vi: "🇻🇳",
    en: "🇺🇸",
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
      <div
        className="flex justify-center bg-gray-200 dark:bg-#e9e9e9 text-black dark:text-black"
        style={{ position: "relative" }}
      >
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
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
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

          {/*FILTER*/}
          <button onClick={() => setShowFilter(!showFilter)}>
            ⚙️ Bộ lọc
          </button>

          {/*LOGIN*/}
          <button style={{ color: "black" }}>
            Đăng nhập
          </button>

          {/*DARK MODE*/}
          <NightModeButton size={0.7} />

          {/*ADD FOOD*/}
          <button onClick={() => {
            const newFood = prompt("Nhập món ăn:");
            if (newFood) setFoods([...foods, newFood]);
          }}>
            ➕
          </button>

          {/*LANGUAGE*/}
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