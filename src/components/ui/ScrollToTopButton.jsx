"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const start = window.scrollY;
    const duration = 1200;
    let startTime = null;

    const animateScroll = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;

      const progress = Math.min(timeElapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, start * (1 - ease));

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          width: "64px",        // ⬅️ to hơn
          height: "64px",       // ⬅️ to hơn
          borderRadius: "50%",  // ⬅️ hình tròn
          backgroundColor: "#b30000",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          display: "flex",      // ⬅️ căn giữa icon
          alignItems: "center",
          justifyContent: "center",
          fontSize: "30px",
          zIndex: 9999,
          boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
          transition: "all 0.2s ease",
        }}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    )
  );
}