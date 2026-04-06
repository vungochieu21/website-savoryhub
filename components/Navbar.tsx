"use client";
import { useState } from "react";
import LocationSelect from "./LocaSelect";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("order");
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);

  return (
    <div style={{ fontFamily: "Arial" }}>
      
      {/* 🔹 Top bar */}
      <div style={{
        display: "flex",
        background: "#1f4e79",
        color: "white"
      }}>
        <div
          onClick={() => setActiveTab("explore")}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            background: activeTab === "explore" ? "#ccc" : "transparent",
            color: activeTab === "explore" ? "black" : "white"
          }}
        >
          Khám phá
        </div>

        <div
          onClick={() => setActiveTab("order")}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            borderBottom: activeTab === "order" ? "3px solid white" : "none"
          }}
        >
          Đặt hàng
        </div>
      </div>

      {/* 🔹 Main header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        background: "#e9e9e9",
        gap: "10px"
      }}>
        
        {/* Menu */}
        <button onClick={() => alert("Menu clicked")}>☰</button>

        <div style={{
          color: "#1f4e79",
          fontWeight: "bold",
          fontSize: "20px"
        }}>
          LOGO
        </div>

        {/* Location */}
        <LocationSelect />

        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Địa điểm, món ăn..."
          style={{ flex: 1, padding: "5px" }}
        />

        {/* Search button */}
        <button onClick={() => alert("Tìm: " + search)}>🔍</button>

        {/* Filter */}
        <button onClick={() => alert("Mở bộ lọc")}>⚙️ Bộ lọc</button>

        {/* Login */}
        <button onClick={() => alert("Đăng nhập")}>Đăng nhập</button>

        {/* Dark mode */}
        <button onClick={() => setDark(!dark)}>
          {dark ? "🌙" : "☀️"}
        </button>

        {/* Add */}
        <button onClick={() => alert("Thêm mới")}>➕</button>

        {/* Language */}
        <button onClick={() => alert("Đổi ngôn ngữ")}>🌐</button>
      </div>
    </div>
  );
}