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
  FaEnvelope,
  FaMapMarkerAlt,
  FaLock,
  FaUtensils, // Icon logo mới liên quan món ăn
} from "react-icons/fa";

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

  const [showProfile, setShowProfile] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleAuth = () => setUser(getCurrentUser());

    window.addEventListener("authChange", handleAuth);
    setUser(getCurrentUser());

    return () => window.removeEventListener("authChange", handleAuth);
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

        {/* LOGO CUSTOM SVG DESIGNED */}
        <div className="logo-wrapper" onClick={() => router.push("/")}>
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="custom-svg-logo"
          >
            {/* Vòng tròn nền cách điệu */}
            <path d="M20 50C20 33.4315 33.4315 20 50 20C66.5685 20 80 33.4315 80 50" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
            {/* Biểu tượng cái dĩa và làn khói hình trái tim */}
            <path d="M40 45V65M50 45V75M60 45V65" stroke="#b30000" strokeWidth="6" strokeLinecap="round" className="logo-icon-detail"/>
            <path d="M50 35C55 25 65 25 65 35C65 45 50 50 50 50C50 50 35 45 35 35C35 25 45 25 50 35Z" fill="#b30000" className="heart-steam"/>
          </svg>
          <span className="logo-text">Tastii</span>
        </div>

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
        <button className="icon-btn filter-btn" onClick={() => router.push("/filter")}>
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
            onClick={(e) => {
              e.stopPropagation();
              setShowUserMenu(!showUserMenu);
              setShowSettings(false);
            }}
          >
            <FaUserCircle size={20} />
          </button>

          {showUserMenu && (
            <div className="dropdown">
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

        {/* FAVORITES POPUP (RESTORED) */}
        {showFavorites && (
          <div className="favorites-popup">
            <div className="favorites-header">❤️ {t("favorites")}</div>
            <div className="favorites-body">
              <p>{t("empty_favorite")}</p>
            </div>
          </div>
        )}

        {/* PROFILE POPUP (OPTIMIZED) */}
        {showProfile && (
          <div className="profile-popup" onClick={() => setShowProfile(false)}>
            <div
              className="profile-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="profile-header">
                <FaUserCircle size={40} color="#b30000" />
                <h3>{t("account")}</h3>
              </div>

              <div className="profile-info-list">
                <div className="info-item">
                   <span className="info-label"><FaUserCircle /> Tài khoản</span>
                   <span className="info-text">{user?.name}</span>
                </div>
                
                <div className="info-item">
                   <span className="info-label"><FaEnvelope /> Email</span>
                   <span className="info-text">{user?.email}</span>
                </div>

                <div className="info-item">
                   <span className="info-label"><FaMapMarkerAlt /> Địa chỉ</span>
                   <span className="info-text">{user?.address || "Chưa có"}</span>
                </div>

                <div className="info-item">
                   <span className="info-label"><FaLock /> Mật khẩu</span>
                   <div className="pass-display">
                      <span className="pass-dots">
                        {showPass ? user?.password : "••••••••"}
                      </span>
                      <button className="eye-btn" onClick={() => setShowPass(!showPass)}>
                        <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
                      </button>
                   </div>
                </div>
              </div>

              <button
                className="close-profile-btn"
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
              setShowSettings(!showSettings);
              setShowUserMenu(false);
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

      {/* ================= STYLE ================= */}
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

        /* --- LOGO TASTII CUSTOM DESIGN --- */
        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          user-select: none;
        }

        .custom-svg-logo {
          transition: transform 0.5s ease;
          color: var(--navbar-text);
        }

        .logo-text {
          font-size: 28px;
          font-weight: 900;
          font-family: 'Poppins', sans-serif;
          letter-spacing: -1px;
          background: linear-gradient(to right, #b30000 50%, var(--navbar-text) 50%);
          background-size: 200% 100%;
          background-position: 100% 0;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: background-position 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Hiệu ứng khi di chuột */
        .logo-wrapper:hover {
          transform: scale(1.08); /* Chữ to lên nhẹ */
        }

        .logo-wrapper:hover .logo-text {
          background-position: 0 0; /* Đỏ dần từ trái sang phải */
        }

        .logo-wrapper:hover .custom-svg-logo {
          transform: rotate(-10deg); /* Logo hơi nghiêng nghịch ngợm */
        }

        .heart-steam {
          transition: transform 0.3s ease;
        }

        .logo-wrapper:hover .heart-steam {
          transform: translateY(-5px) scale(1.1); /* Tim bay lên nhẹ */
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
          transition: all 0.25s ease;
        }

        .search-box:focus-within {
          box-shadow: 0 0 0 3px #b30000;
          transform: scale(1.03);
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
        }

        .search-btn:hover {
          background: #b30000;
          color: white;
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
        }

        .mode {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
        }

        .favorites-popup {
          position: fixed;
          top: 80px;
          right: 20px;
          width: 260px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px;
        }

        /* --- PROFILE POPUP FIX (HẾT LAG) --- */
        .profile-popup {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10001;
        }

        .profile-card {
          width: 340px;
          background: var(--surface);
          color: var(--navbar-text);
          border-radius: 16px;
          padding: 24px;
          border: 1px solid var(--border);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          animation: popIn 0.2s ease-out;
          will-change: transform, opacity;
        }

        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .profile-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .profile-header h3 {
          margin: 0;
          font-size: 18px;
        }

        .profile-info-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .info-label {
          font-size: 12px;
          font-weight: bold;
          color: #888;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .info-text {
          font-size: 15px;
          padding-bottom: 5px;
          border-bottom: 1px solid var(--border);
        }

        .pass-display {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
          padding-bottom: 5px;
        }

        .pass-dots {
          letter-spacing: 4px;
          font-weight: bold;
        }

        .eye-btn {
          background: transparent;
          border: none;
          color: var(--navbar-text);
          cursor: pointer;
          opacity: 0.6;
        }

        .eye-btn:hover { opacity: 1; }

        .close-profile-btn {
          width: 100%;
          margin-top: 20px;
          padding: 10px;
          border-radius: 8px;
          border: none;
          background: #b30000;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        .close-profile-btn:hover {
          background: #d40000;
        }
      `}</style>
    </div>
  );
}