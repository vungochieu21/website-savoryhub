"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import NightModeButton from "../ui/NightModeButton";
import styles from "./Navbar.module.css";

import {
  FaSearch, FaFilter, FaUserCircle, FaPlus, FaCog, FaGlobe,
  FaSignInAlt, FaUserPlus, FaHeart, FaSignOutAlt, FaEnvelope,
  FaMapMarkerAlt, FaLock, FaCheckCircle, FaChartBar
} from "react-icons/fa";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { getCurrentUser, logoutUser, addCustomFood } from "src/utils/Storage";
import { useLanguage } from "src/locales/context/LanguageContext";
import { useFavorites } from "src/locales/context/FavoriteContext";
import { texts } from "src/locales/lang/texts";
import foodsData from "src/data/food.json";
import FoodForm from "src/components/food/FoodForm";

type NavbarProps = { onAdd?: (formData: any) => void; };

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
  
  // Trạng thái đóng mở Form popup
  const [isOpenForm, setIsOpenForm] = useState(false);
  
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { favorites } = useFavorites();
  const { lang, setLang, t } = useLanguage();

  const userMenuRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getFoodData = () => {
    const currentTexts = texts[lang as keyof typeof texts] || texts.vi;
    return foodsData.map(food => ({
      ...food,
      translatedName: (currentTexts as any)[food.name] || food.name
    }));
  };

  useEffect(() => {
    const handleAuth = () => setUser(getCurrentUser());
    window.addEventListener("authChange", handleAuth);
    setUser(getCurrentUser());

    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) setShowUserMenu(false);
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) setShowSettings(false);
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSuggestions([]);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("authChange", handleAuth);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setActiveIndex(-1);
    if (val.trim()) {
      const allFoods = getFoodData();
      const filtered = allFoods.filter(food => 
        food.translatedName.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 10));
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) {
        if (e.key === "Enter" && search.trim()) {
            router.push(`/filter?q=${encodeURIComponent(search)}`);
        }
        return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        const selected = suggestions[activeIndex];
        router.push(`/food/${selected.id}`);
        setSuggestions([]);
        setSearch("");
      } else {
        router.push(`/filter?q=${encodeURIComponent(search)}`);
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  useEffect(() => {
    if (activeIndex >= 0 && suggestionRefs.current[activeIndex]) {
      suggestionRefs.current[activeIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [activeIndex]);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    window.dispatchEvent(new Event("authChange"));
    setShowUserMenu(false);
    setShowToast(true);
    router.push("/");
    setTimeout(() => setShowToast(false), 2000);
  };

  const flags: any = { vi: "🇻🇳", en: "🇺🇸" };

  return (
    <>
      <div className={`${styles.navbar} px-3 md:px-6 lg:px-10`}>
        <div className={`${styles.navInner} max-w-7xl mx-auto flex items-center justify-between`}>
          <div className={styles.logoWrapper} onClick={() => router.push("/")}>
            <img src="/Logo.png" alt="Tastii" className={styles.logoImg} />
          </div>

          <div className={styles.searchWrapper} ref={searchRef}>
            <div className={styles.searchBox}>
              <input 
                value={search} 
                onChange={(e) => handleSearchChange(e.target.value)} 
                onKeyDown={handleKeyDown}
                placeholder={t("search")} 
              />
              <button onClick={() => search.trim() && router.push(`/filter?q=${encodeURIComponent(search)}`)} className={styles.searchBtn}>
                <FaSearch />
              </button>
            </div>
            {suggestions.length > 0 && (
              <div className={styles.suggestions}>
                {suggestions.map((food, index) => (
                  <div 
                    key={food.id} 
                    ref={el => { suggestionRefs.current[index] = el; }}
                    className={`${styles.suggestionItem} ${activeIndex === index ? styles.activeSuggestion : ""}`} 
                    onClick={() => { 
                      router.push(`/food/${food.id}`); 
                      setSuggestions([]); 
                      setSearch("");
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <FaSearch size={12} style={{ opacity: 0.5 }} />
                    <span>{food.translatedName}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className={styles.iconBtn} onClick={() => router.push("/filter")}><FaFilter /></button>
          
          {/* Mở Form */}
          <button className={styles.iconBtn} onClick={() => setIsOpenForm(true)}><FaPlus /></button>

          <div className={styles.userMenu} ref={userMenuRef}>
            <button className={styles.iconBtn} onClick={() => { setShowUserMenu(!showUserMenu); setShowSettings(false); }}>
              <FaUserCircle size={20} />
            </button>

            {showUserMenu && (
              <div className={`${styles.dropdown} ${styles.userDropdown}`}>
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
                    <button onClick={() => router.push("/dashboard")}>
                      <FaChartBar /> {t("dashboard")}
                    </button>
                    <button onClick={handleLogout}>
                      <FaSignOutAlt /> {t("logout")}
                    </button>
                  </>
                )}
                <button onClick={() => { if (favorites.length > 0) router.push("/favorites"); else setShowFavorites(true); setShowUserMenu(false); setTimeout(() => setShowFavorites(false), 4000); }}>
                  <FaHeart /> {t("favorites")}
                </button>
              </div>
            )}
          </div>

          {showToast && (
            <div className={styles.favPopup}>
              <div className={styles.favHeader}><FaCheckCircle style={{ marginRight: '8px' }} /> {t("logout_success")}</div>
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
                  <div className={styles.infoItem}><span className={styles.infoLabel}><FaUserCircle /> {t("account_label")}</span><span className={styles.infoText}>{user?.name}</span></div>
                  <div className={styles.infoItem}><span className={styles.infoLabel}><FaEnvelope /> {t("email")}</span><span className={styles.infoText}>{user?.email}</span></div>
                  <div className={styles.infoItem}><span className={styles.infoLabel}><FaMapMarkerAlt /> {t("address")}</span><span className={styles.infoText}>{user?.address || t("no_address")}</span></div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}><FaLock /> {t("password")}</span>
                    <div className={styles.passDisplay}>
                      <span className={styles.passDots}>{showPass ? user?.password : "••••••••"}</span>
                      <button className={styles.eyeBtn} onClick={() => setShowPass(!showPass)}><FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} /></button>
                    </div>
                  </div>
                </div>
                <button className={styles.closeBtn} onClick={() => setShowProfile(false)}>{t("close")}</button>
              </div>
            </div>
          )}

          <div className={styles.settings} ref={settingsRef}>
            <button className={styles.iconBtn} onClick={() => { setShowSettings(!showSettings); setShowUserMenu(false); }}><FaCog /></button>
            {showSettings && (
              <div className={styles.dropdown}>
                <button onClick={() => setLang(lang === "vi" ? "en" : "vi")}><FaGlobe /> {t("language")} {flags[lang]}</button>
                <div className={styles.modeRow}><NightModeButton size={0.7} /> {t("mode")}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isOpenForm && (
        <FoodForm 
          onClose={() => setIsOpenForm(false)} 
          onSave={(formData: any) => {
            addCustomFood(formData); // Lưu cục dữ liệu nguyên bản vào Storage
            setIsOpenForm(false);
          }} 
        />
      )}
    </>
  );
}