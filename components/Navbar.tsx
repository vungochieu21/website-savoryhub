"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NightModeButton from "./NightModeButton";

import {
  FaSearch,
  FaFilter,
  FaUserCircle,
  FaPlus,
  FaCog,
  FaGlobe,
} from "react-icons/fa";

export default function Navbar({ onAdd }: { onAdd: () => void }) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [lang, setLang] = useState("vi");
  const [hovered, setHovered] = useState<string | null>(null);

  const flags: any = {
    vi: "🇻🇳",
    en: "🇺🇸",
  };

  const hoverColor = "#b30000";

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push("/filter");
  };

  const getIconBtn = (key: string) => ({
    background: hovered === key ? hoverColor : "#f5f5f5",
    border: "none",
    padding: "12px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    transition: "0.2s",
    color: hovered === key ? "white" : "black",
  });

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        background: "rgb(255, 255, 255)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        borderBottom: "1px solid #eee",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "14px 24px",
          gap: "10px",
          width: "100%",
          maxWidth: "1400px",
        }}
      >
        {/* LOGO */}
        <span
          onClick={() => router.push("/")}
          className="logo-text text-2xl font-bold cursor-pointer"
        >
          Tastii
        </span>

        {/* SEARCH */}
        <div
          style={{
            width: "460px",
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            background: "#f5f5f5",
            padding: "10px 18px",
            borderRadius: "999px",
            border: "1px solid #ddd",
            gap: "10px",
          }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Tìm địa điểm, món ăn..."
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              outline: "none",
              fontSize: "15px",
            }}
          />

          {/* SEARCH ICON */}
          <button
            onClick={handleSearch}
            onMouseEnter={() => setHovered("search")}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: hovered === "search" ? hoverColor : "#888",
              transition: "0.2s",
            }}
          >
            <FaSearch />
          </button>
        </div>

        {/* FILTER */}
        <button
          onClick={() => router.push("/filter")}
          onMouseEnter={() => setHovered("filter")}
          onMouseLeave={() => setHovered(null)}
          style={getIconBtn("filter")}
        >
          <FaFilter />
        </button>

        {/* ADD */}
        <button
          onClick={onAdd}
          onMouseEnter={() => setHovered("add")}
          onMouseLeave={() => setHovered(null)}
          style={getIconBtn("add")}
        >
          <FaPlus />
        </button>

        {/* USER */}
        <button
          onMouseEnter={() => setHovered("user")}
          onMouseLeave={() => setHovered(null)}
          style={getIconBtn("user")}
        >
          <FaUserCircle size={22} />
        </button>

        {/* SETTINGS */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowSettings(!showSettings)}
            onMouseEnter={() => setHovered("settings")}
            onMouseLeave={() => setHovered(null)}
            style={getIconBtn("settings")}
          >
            <FaCog />
          </button>

          {showSettings && (
            <div
              style={{
                position: "absolute",
                top: "55px",
                right: 0,
                background: "white",
                borderRadius: "14px",
                padding: "12px",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                minWidth: "180px",
              }}
            >
              {/* LANGUAGE */}
              <button
                onClick={() =>
                  setLang(lang === "vi" ? "en" : "vi")
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px",
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
              >
                <FaGlobe />
                Ngôn ngữ {flags[lang]}
              </button>

              {/* DARK MODE */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px",
                  width: "100%",
                }}
              >
                <NightModeButton size={0.7} />
                Chế độ
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}