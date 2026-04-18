"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NightModeButton from "../ui/NightModeButton";
import {
  FaSearch,
  FaFilter,
  FaUserCircle,
  FaPlus,
  FaCog,
  FaGlobe,
  FaSignInAlt,
  FaUserPlus,
  FaHeart,
  FaSignOutAlt,
} from "react-icons/fa";
import { getCurrentUser, logoutUser } from "@/utils/Storage";

type NavbarProps = {
  onAdd: () => void;
};

export default function Navbar({ onAdd }: NavbarProps) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [lang, setLang] = useState("vi");

  const t = (key: string) => {
    const dict: any = {
      search: "Tìm kiếm...",
      login: "Đăng nhập",
      register: "Đăng ký",
      account: "Tài khoản",
      logout: "Đăng xuất",
      favorites: "Yêu thích",
      empty_favorite: "Chưa có món nào",
      language: "Ngôn ngữ",
      mode: "Chế độ",
    };

    return dict[key] || key;
  };

  useEffect(() => {
    const handleAuth = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener("authChange", handleAuth);
    setUser(getCurrentUser());

    return () => {
      window.removeEventListener("authChange", handleAuth);
    };
  }, []);

  const flags: any = {
    vi: "🇻🇳",
    en: "🇺🇸",
  };

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push("/filter");
  };

  const openFavorites = () => {
    setShowFavorites(true);
    setTimeout(() => setShowFavorites(false), 5000);
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
            placeholder={t("search")}
          />

          <button onClick={handleSearch} className="search-btn">
            <FaSearch />
          </button>
        </div>

        {/* FILTER */}
        <button className="icon-btn" onClick={() => router.push("/filter")}>
          <FaFilter />
        </button>

        {/* ADD */}
        <button className="icon-btn" onClick={onAdd}>
          <FaPlus />
        </button>

        {/* USER */}
        <div className="user-menu">
          <button
            className="icon-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <FaUserCircle size={20} />
          </button>

          {showUserMenu && (
            <div className="dropdown user-dropdown">

              {!user ? (
                <>
                  <button onClick={() => router.push("/login")}>
                    <FaSignInAlt /> {t("login")}
                  </button>

                  <button onClick={() => router.push("/register")}>
                    <FaUserPlus /> {t("register")}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() =>
                      alert(`Tên: ${user.name}\nEmail: ${user.email}`)
                    }
                  >
                    <FaUserCircle /> {t("account")}
                  </button>

                  <button
                    onClick={() => {
                      logoutUser();
                      setUser(null);
                      window.dispatchEvent(new Event("authChange"));
                    }}
                  >
                    <FaSignOutAlt /> {t("logout")}
                  </button>
                </>
              )}

              <button onClick={openFavorites}>
                <FaHeart /> {t("favorites")}
              </button>

            </div>
          )}
        </div>

        {/* FAVORITES */}
        {showFavorites && (
          <div className="favorites-popup">
            <div className="favorites-header">❤️ {t("favorites")}</div>
            <div className="favorites-body">
              <p>{t("empty_favorite")}</p>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        <div className="settings">
          <button
            className="icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowSettings((prev) => !prev);
            }}
          >
            <FaCog />
          </button>

          {showSettings && (
            <div className="dropdown">
              <button onClick={() => setLang(lang === "vi" ? "en" : "vi")}>
                <FaGlobe /> {t("language")} {flags[lang]}
              </button>

              <div className="mode">
                <NightModeButton size={0.7} />
                {t("mode")}
              </div>
            </div>
          )}
        </div>

      </div>

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
          box-shadow: 0 0 0 2px #b30000;
          transform: scale(1.02);
        }

        .search-box input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          color: var(--navbar-text);
          font-size: 15px;
        }

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
          transform: scale(1.15);
        }

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

        .settings,
        .user-menu {
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
          text-align: left;
          white-space: nowrap;
        }

        .dropdown button:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .mode {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          white-space: nowrap;
        }

        .favorites-popup {
          position: fixed;
          top: 80px;
          right: 20px;
          width: 260px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
          padding: 12px;
          z-index: 10000;
        }

        .favorites-header {
          font-weight: bold;
          margin-bottom: 8px;
        }

        .favorites-body {
          font-size: 14px;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}