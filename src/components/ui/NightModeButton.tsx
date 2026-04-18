"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import styles from "./NightModeButton.module.css";

export default function NightModeButton({ size = 1 }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark";

    setDark(isDark);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const handleToggle = (e: any) => {
    e?.stopPropagation();
    setDark((prev) => !prev);
  };

  const width = 60 * size;
  const height = 30 * size;
  const sliderSize = 24 * size;

  return (
    <div
      onClick={handleToggle}
      className={styles.wrapper}
      style={{ width, height }}
    >
      {/* BACKGROUND */}
      <div
        className={`${styles.bg} ${
          dark ? styles.bgDark : styles.bgLight
        }`}
      />

      {/* SUN */}
      <div
        className={`${styles.icon} ${styles.sun}`}
        style={{ fontSize: 12 * size }}
      >
        <FontAwesomeIcon
          icon={faSun}
          style={{
            color: dark ? "#fff" : "#000",
            transition: "0.3s",
          }}
        />
      </div>

      {/* MOON */}
      <div
        className={`${styles.icon} ${styles.moon}`}
        style={{ fontSize: 12 * size }}
      >
        <FontAwesomeIcon
          icon={faMoon}
          style={{
            color: dark ? "#fff" : "#111",
            transition: "0.3s",
          }}
        />
      </div>

      {/* SLIDER */}
      <div
        className={styles.slider}
        style={{
          width: sliderSize,
          height: sliderSize,
          transform: dark
            ? `translate(${(60 - 21 - 6) * size}px, -50%)`
            : `translate(3px, -50%)`,
        }}
      />
    </div>
  );
}