"use client";
import { useState, useEffect } from "react";

export default function NightModeButton({ size = 1 }) {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
  return false;
  });
  
  // apply dark mode
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
      onClick={() => setDark(!dark)}
      className="relative flex items-center cursor-pointer"
      style={{
        width: 60 * size,
        height: 30 * size,
      }}
    >
      {/* Background */}
      <div
        className={`absolute w-full h-full rounded-full transition ${
          dark ? "bg-gray-300" : "bg-gray-300"
        }`}
      />

      {/* Icons */}
      <div className="absolute left-2 text-sm" style={{ fontSize: 12 * size }}>
        ☀️
      </div>
      <div className="absolute right-2 text-sm" style={{ fontSize: 12 * size }}>
        🌙
      </div>

      {/* Toggle circle */}
      <div
        className={`bg-white rounded-full shadow-md transform transition absolute`}
        style={{
          width: 24 * size,
          height: 24 * size,
          transform: dark
            ? `translateX(${(60 - 21 - 6) * size}px)`
            : `translateX(3px)`
        }}
      />
    </div>
  );
}