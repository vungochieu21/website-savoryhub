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

  const flags: any = {
    vi: "🇻🇳",
    en: "🇺🇸",
  };

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push("/filter");
  };

  return (
    <div className="navbar">
      <div className="nav-inner">
        {/* LOGO */}
        <span className="logo" onClick={() => router.push("/")}>
          Tastii
        </span>

        {/* SEARCH */}
        <div className="search-box">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Tìm địa điểm, món ăn..."
          />

          <button onClick={handleSearch} className="search-btn">
            <FaSearch />
          </button>
        </div>

        {/* ICON BUTTONS */}
        <button className="icon-btn" onClick={() => router.push("/filter")}>
          <FaFilter />
        </button>

        <button className="icon-btn" onClick={onAdd}>
          <FaPlus />
        </button>

        <button className="icon-btn">
          <FaUserCircle size={20} />
        </button>

        {/* SETTINGS */}
        <div className="settings">
          <button
            className="icon-btn"
            onClick={() => setShowSettings(!showSettings)}
          >
            <FaCog />
          </button>

          {showSettings && (
            <div className="dropdown">
              <button onClick={() => setLang(lang === "vi" ? "en" : "vi")}>
                <FaGlobe /> Ngôn ngữ {flags[lang]}
              </button>

              <div className="mode">
                <NightModeButton size={0.7} />
                Chế độ
              </div>
            </div>
          )}
        </div>
      </div>

      {/* STYLE */}
      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          background: var(--navbar-bg);
          color: var(--navbar-text);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.18);
          z-index: 9999;
        }

        .nav-inner {
          display: flex;
          align-items: center;
          padding: 14px 24px;
          gap: 10px;
          width: 100%;
          max-width: 1400px;
        }

        .logo {
          font-size: 22px;
          font-weight: bold;
          cursor: pointer;
        }

        /* SEARCH */
        .search-box {
          width: 460px;
          margin-left: auto;
          display: flex;
          align-items: center;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 6px 10px 6px 18px;
          gap: 10px;
          transition: 0.2s;
        }

        .search-box:focus-within {
          box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.75);
        }

        .search-box input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          color: var(--navbar-text);
          font-size: 15px;
        }

        /* SEARCH BUTTON */
        .search-btn {
          width: 34px;
          height: 34px;
          border: none;
          background: transparent;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--navbar-text);
          transition: 0.2s;
        }

        .search-btn:hover {
          background: #b30000;
          color: white;
          transform: scale(1.1);
        }

        /* ICON BUTTON */
        .icon-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--surface);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.2s;
          color: var(--navbar-text);
        }

        .icon-btn:hover {
          background: #b30000;
          color: white;
        }

        /* SETTINGS */
        .settings {
          position: relative;
        }

        .dropdown {
          position: absolute;
          top: 55px;
          right: 0;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 10px;
          min-width: 180px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
        }

        .dropdown button {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px;
          border: none;
          background: transparent;
          cursor: pointer;
          color: var(--navbar-text);
        }

        .dropdown button:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .mode {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
        }
      `}</style>
    </div>
  );
}