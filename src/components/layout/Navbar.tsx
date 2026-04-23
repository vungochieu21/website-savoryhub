"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import NightModeButton from "../ui/NightModeButton";
import styles from "./Navbar.module.css";

import {
  FaSearch, FaFilter, FaUserCircle, FaPlus, FaCog, FaGlobe,
  FaSignInAlt, FaUserPlus, FaHeart, FaSignOutAlt, FaEnvelope,
  FaMapMarkerAlt, FaLock, FaCheckCircle
} from "react-icons/fa";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { getCurrentUser, logoutUser } from "src/utils/Storage";
import { useLanguage } from "src/locales/context/LanguageContext";
import { useFavorites } from "src/locales/context/FavoriteContext";

type NavbarProps = { onAdd: () => void; };

export default function Navbar({ onAdd }: NavbarProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const { favorites } = useFavorites();
  const { lang, setLang, t } = useLanguage();

  const userMenuRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleAuth = () => setUser(getCurrentUser());
    window.addEventListener("authChange", handleAuth);
    setUser(getCurrentUser());

    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) setShowUserMenu(false);
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) setShowSettings(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("authChange", handleAuth);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    window.dispatchEvent(new Event("authChange"));
    setShowUserMenu(false);

    setShowToast(true);
    router.push("/");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const flags: any = { vi: "🇻🇳", en: "🇺🇸" };

  return (
    <div className={styles.navbar}>
      <div className={styles.navInner}>
        <div className={styles.logoWrapper} onClick={() => router.push("/")}>
          <img src="/Logo.png" alt="Tastii" className={styles.logoImg} />
        </div>

        <div className={styles.searchBox}>
          <input 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            onKeyDown={(e) => e.key === "Enter" && search.trim() && router.push(`/filter?q=${encodeURIComponent(search)}`)}
            placeholder={t("search")} 
          />
          <button onClick={() => search.trim() && router.push("/filter")} className={styles.searchBtn}>
            <FaSearch />
          </button>
        </div>

        <button className={styles.iconBtn} onClick={() => router.push("/filter")}><FaFilter /></button>
        <button className={styles.iconBtn} onClick={onAdd}><FaPlus /></button>

        <div className={styles.userMenu} ref={userMenuRef}>
          <button className={styles.iconBtn} onClick={() => { setShowUserMenu(!showUserMenu); setShowSettings(false); }}>
            <FaUserCircle size={20} />
          </button>

          {showUserMenu && (
            <div className={styles.dropdown}>
              {!user ? (
                <>
                  <button onClick={() => router.push("/login")}><FaSignInAlt /> {t("login")}</button>
                  <button onClick={() => router.push("/register")}><FaUserPlus /> {t("register")}</button>
                </>
              ) : (
                <>
                  <button onClick={() => { setShowProfile(true); setShowUserMenu(false); }}>
                    <FaUserCircle /> {t("account")}
                  </button>
                  <button onClick={handleLogout}>
                    <FaSignOutAlt /> {t("logout")}
                  </button>
                </>
              )}

              <button
                onClick={() => {
                  if (favorites.length > 0) {
                    router.push("/favorites");
                  } else {
                    setShowFavorites(true);
                    setTimeout(() => setShowFavorites(false), 4000);
                  }
                  setShowUserMenu(false);
                }}
              >
                <FaHeart /> {t("favorites")}
              </button>
            </div>
          )}
        </div>

        {showToast && (
          <div className={styles.favPopup}>
            <div className={styles.favHeader}>
              <FaCheckCircle style={{ marginRight: '8px' }} /> 
              {t("logout_success")}
            </div>
          </div>
        )}

        {showFavorites && (
          <div className={styles.favPopup}>
            <div className={styles.favHeader}>❤️ {t("favorites")}</div>
            <div className={styles.favBody}>{t("empty_favorite")}</div>
          </div>
        )}

        {showProfile && (
          <div className={styles.profileOverlay} onClick={() => setShowProfile(false)}>
            <div className={styles.profileCard} onClick={(e) => e.stopPropagation()}>
              <div className={styles.profileHeader}>
                <FaUserCircle size={40} color="#b30000" />
                <h3>{t("account")}</h3>
              </div>

              <div className={styles.profileInfoList}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>
                    <FaUserCircle /> {t("account_label")}
                  </span>
                  <span className={styles.infoText}>{user?.name}</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>
                    <FaEnvelope /> {t("email")}
                  </span>
                  <span className={styles.infoText}>{user?.email}</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>
                    <FaMapMarkerAlt /> {t("address")}
                  </span>
                  <span className={styles.infoText}>
                    {user?.address || t("no_address")}
                  </span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>
                    <FaLock /> {t("password")}
                  </span>
                  <div className={styles.passDisplay}>
                    <span className={styles.passDots}>
                      {showPass ? user?.password : "••••••••"}
                    </span>
                    <button className={styles.eyeBtn} onClick={() => setShowPass(!showPass)}>
                      <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </div>
              </div>

              <button className={styles.closeBtn} onClick={() => setShowProfile(false)}>
                {t("close")}
              </button>
            </div>
          </div>
        )}

        <div className={styles.settings} ref={settingsRef}>
          <button className={styles.iconBtn} onClick={() => { setShowSettings(!showSettings); setShowUserMenu(false); }}>
            <FaCog />
          </button>

          {showSettings && (
            <div className={styles.dropdown}>
              <button onClick={() => setLang(lang === "vi" ? "en" : "vi")}>
                <FaGlobe /> {t("language")} {flags[lang]}
              </button>
              <div className={styles.modeRow}>
                <NightModeButton size={0.7} /> {t("mode")}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}