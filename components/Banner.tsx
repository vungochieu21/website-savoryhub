"use client";

import { useEffect, useState } from "react";

export default function Banner() {
  const [current, setCurrent] = useState(1);
  const [transition, setTransition] = useState(true);

  const banners = [
    { id: 1, img: "https://picsum.photos/1200/300?1" },
    { id: 2, img: "https://picsum.photos/1200/300?2" },
    { id: 3, img: "https://picsum.photos/1200/300?3" },
  ];

  const loopBanners = [
    banners[banners.length - 1],
    ...banners,
    banners[0],
  ];

  const nextSlide = () => setCurrent((prev) => prev + 1);
  const prevSlide = () => setCurrent((prev) => prev - 1);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (current === loopBanners.length - 1) {
      setTimeout(() => {
        setTransition(false);
        setCurrent(1);
      }, 500);
    }

    if (current === 0) {
      setTimeout(() => {
        setTransition(false);
        setCurrent(banners.length);
      }, 500);
    }

    const t = setTimeout(() => setTransition(true), 20);
    return () => clearTimeout(t);
  }, [current]);

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px 0", marginTop: "85px" }}>
      <div style={container}>
        
        {/* SLIDER */}
        <div
          style={{
            display: "flex",
            transform: `translateX(-${current * 100}%)`,
            transition: transition ? "0.5s ease" : "none",
          }}
        >
          {loopBanners.map((banner, index) => (
            <div key={index} style={{ minWidth: "100%" }}>
              <img src={banner.img} style={imgStyle} />
            </div>
          ))}
        </div>

        {/* LEFT */}
        <button onClick={prevSlide} style={arrowLeft}>
          <span style={iconStyle}>{"<"}</span>
        </button>

        {/* RIGHT */}
        <button onClick={nextSlide} style={arrowRight}>
          <span style={iconStyle}>{">"}</span>
        </button>

        {/* DOTS */}
        <div style={dotsWrap}>
          {banners.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index + 1)}
              style={{
                ...dotStyle,
                background: current === index + 1 ? "#b30000" : "#ccc",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* STYLE */
const container = {
  maxWidth: "1300px",
  width: "100%",
  overflow: "hidden",
  position: "relative" as const,
  borderRadius: "30px",
};

const imgStyle = {
  width: "100%",
  height: "300px",
  objectFit: "cover" as const,
  borderRadius: "30px",
  display: "block",
};

/* Circle */
const arrowBase = {
  position: "absolute" as const,
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 20,
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  border: "none",
  background: "rgba(0,0,0,0.5)",
  color: "white",
  cursor: "pointer",
  padding: 0,
};

const arrowLeft = {
  ...arrowBase,
  left: "15px",
};

const arrowRight = {
  ...arrowBase,
  right: "15px",
};

const iconStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",

  /* custom button right*/
  transform: "translate(-40%, -59%) translate(-1px, 0px)", 

  fontSize: "18px",
  lineHeight: "1",
};
/* 3 DOT */
const dotsWrap = {
  position: "absolute" as const,
  bottom: "15px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "8px",
  zIndex: 20,
};

const dotStyle = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  cursor: "pointer",
};