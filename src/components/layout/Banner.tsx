"use client";

import { useEffect, useState } from "react";

export default function Banner() {
  const [current, setCurrent] = useState(1);
  const [transition, setTransition] = useState(true);

  const banners = [
    { id: 1, img: "https://cdn.justfly.vn/1170x400/media/fb/56/eb2a-6cf2-4e18-8f76-047ac8653ae3.jpg" },
    { id: 2, img: "https://wallpapers.com/images/hd/food-4k-3gsi5u6kjma5zkj0.jpg" },
    { id: 3, img: "https://wallpapersok.com/images/hd/a-large-plate-of-asian-food-spdnpz7bhmx4kv2r.jpg" },
  ];

  const loopBanners = [banners[banners.length - 1], ...banners, banners[0]];

  const nextSlide = () => setCurrent((p) => p + 1);
  const prevSlide = () => setCurrent((p) => p - 1);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      if (current === loopBanners.length - 1) {
        setTransition(false);
        setCurrent(1);
      }

      if (current === 0) {
        setTransition(false);
        setCurrent(banners.length);
      }
    }, 500);

    const timeout2 = setTimeout(() => setTransition(true), 20);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [current]);

  return (
    <div style={wrapper}>
      <div style={container}>
        {/* SLIDER */}
        <div
          style={{
            display: "flex",
            transform: `translateX(-${current * 100}%)`,
            transition: transition ? "0.5s ease" : "none",
          }}
        >
          {loopBanners.map((b, i) => (
            <div key={i} style={{ minWidth: "100%" }}>
              <img src={b.img} style={imgStyle} />
            </div>
          ))}
        </div>

        {/* ARROWS */}
        <button onClick={prevSlide} style={{ ...arrowBase, left: 15 }}>
          <span style={iconStyle}>{"<"}</span>
        </button>

        <button onClick={nextSlide} style={{ ...arrowBase, right: 15 }}>
          <span style={iconStyle}>{">"}</span>
        </button>

        {/* DOTS */}
        <div style={dotsWrap}>
          {banners.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i + 1)}
              style={{
                ...dotStyle,
                background: current === i + 1 ? "#b30000" : "#ccc",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* STYLE */
const wrapper = {
  display: "flex",
  justifyContent: "center",
  padding: "20px 0",
  marginTop: "85px",
};

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

const iconStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-40%, -59%)",
  fontSize: "18px",
  lineHeight: "1",
};

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