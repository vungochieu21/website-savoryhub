"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import styles from "./NightModeButton.module.css";

export default function NightModeButton({ size = 1 }) {

  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

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

  return (
    <div
      onClick={handleToggle}
      className={styles.wrapper}
      style={{
        width: 60 * size,
        height: 30 * size,
      }}
    >
      {/* Background */}
      <div
        className={`${styles.background} ${
          dark ? styles.darkBg : styles.lightBg
        }`}
      />

      {/* SUN */}
      <div
        className={styles.icon}
        style={{
          left: 8,
          fontSize: 12 * size,
        }}
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
        className={styles.icon}
        style={{
          right: 8,
          fontSize: 12 * size,
        }}
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
          width: 24 * size,
          height: 24 * size,
          transform: dark
            ? `translate3d(${(60 - 21 - 6) * size}px, -50%, 0)`
            : `translate3d(3px, -50%, 0)`,
        }}
      />
    </div>
  );
}