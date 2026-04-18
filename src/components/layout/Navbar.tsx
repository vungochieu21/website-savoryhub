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

// ✅ ADD ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { getCurrentUser, logoutUser } from "src/utils/Storage";
import { useLanguage } from "src/locales/context/LanguageContext";

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

  // ✅ ADD
  const [showProfile, setShowProfile] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { lang, setLang, t } = useLanguage();

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
                  <button onClick={() => setShowProfile(true)}>
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

        {/* ✅ PROFILE */}
        {showProfile && (
          <div
            className="profile-popup"
            onClick={() => setShowProfile(false)}
          >
            <div
              className="profile-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="profile-title">👤 {t("account")}</div>

              <p><b>Tài khoản:</b> {user?.name}</p>
              <p><b>Email:</b> {user?.email}</p>
              <p><b>Địa chỉ:</b> {user?.address || "Chưa có"}</p>

              <div className="pass-row">
                <b>Mật khẩu:</b>
                <span>
                  {showPass ? user?.password : "••••••••"}
                </span>

                <button onClick={() => setShowPass(!showPass)}>
                  <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
                </button>
              </div>

              <button
                className="close-btn"
                onClick={() => setShowProfile(false)}
              >
                Đóng
              </button>
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
            <div
              className="dropdown"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setLang(lang === "vi" ? "en" : "vi")}>
                <FaGlobe /> {t("language")} {flags[lang]}
              </button>

              <div
                className="mode"
                onClick={(e) => e.stopPropagation()}
              >
                <NightModeButton size={0.7} />
                {t("mode")}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ================= STYLE FIX ================= */}
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

        /* ✅ ADD PROFILE STYLE */
        .profile-popup {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10001;
        }

        .profile-card {
          width: 320px;
          background: var(--surface);
          color: var(--navbar-text);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .profile-title {
          font-weight: bold;
          font-size: 16px;
        }

        .pass-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pass-row button {
          margin-left: auto;
          background: #b30000;
          color: white;
          border: none;
          padding: 6px 10px;
          border-radius: 6px;
          cursor: pointer;
        }

        .close-btn {
          margin-top: 10px;
          padding: 10px;
          background: #b30000;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}