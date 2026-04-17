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
    background: hovered === key ? hoverColor : "var(--surface)",
    border: "1px solid var(--border)",
    padding: "12px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    transition: "0.2s",
    color: hovered === key ? "white" : "var(--navbar-text)",
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
        background: "var(--navbar-bg)",
        color: "var(--navbar-text)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "0 4px 18px rgba(0,0,0,0.18)",
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
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            cursor: "pointer",
            color: "var(--navbar-text)",
          }}
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
            background: "var(--surface)",
            border: "1px solid var(--border)",
            padding: "10px 18px",
            borderRadius: "999px",
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
              outline: "none",
              background: "transparent",
              color: "var(--navbar-text)",
              fontSize: "15px",
            }}
          />

          <button
            onClick={handleSearch}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--navbar-text)",
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
          <FaUserCircle size={20} />
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
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "10px",
                minWidth: "180px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                color: "var(--navbar-text)",
              }}
            >
              {/* LANGUAGE */}
              <button
                onClick={() => setLang(lang === "vi" ? "en" : "vi")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                  padding: "10px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "var(--navbar-text)",
                  fontSize: "16px", // 👈 TO BẰNG CHẾ ĐỘ
                }}
              >
                <FaGlobe style={{ fontSize: "16px" }} />
                <span style={{ fontSize: "16px" }}>
                  Ngôn ngữ {flags[lang]}
                </span>
              </button>

              {/* MODE */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px",
                  color: "var(--navbar-text)",
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