"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function NightModeButton({ size = 1 }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div
      onClick={() => setDark((prev) => !prev)}
      className="relative flex items-center cursor-pointer"
      style={{
        width: 60 * size,
        height: 30 * size,
      }}
    >
      {/* Background */}
      <div
        className={`absolute w-full h-full rounded-full transition-colors duration-500 ${
          dark ? "bg-gray-900" : "bg-gray-200"
        }`}
      />

      {/* ICON LEFT */}
      <div
        className="absolute left-2 flex items-center justify-center"
        style={{ fontSize: 12 * size }}
      >
        <FontAwesomeIcon
          icon={faSun}
          style={{
            color: dark ? "#ffffff" : "#000000",
            transition: "color 0.4s ease",
          }}
        />
      </div>

      {/* ICON RIGHT */}
      <div
        className="absolute right-2 flex items-center justify-center"
        style={{ fontSize: 12 * size }}
      >
        <FontAwesomeIcon
          icon={faMoon}
          style={{
            color: dark ? "#ffffff" : "#111111",
            transition: "color 0.4s ease",
          }}
        />
      </div>

      {/* SLIDER */}
      <div
        className="bg-white rounded-full shadow-md absolute"
        style={{
          width: 24 * size,
          height: 24 * size,
          top: "50%",
          transform: dark
            ? `translate3d(${(60 - 21 - 6) * size}px, -50%, 0)`
            : `translate3d(3px, -50%, 0)`,
          transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}