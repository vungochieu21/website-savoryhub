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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px 0",
        marginTop: "85px",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          width: "100%",
          overflow: "hidden",
          position: "relative",
          borderRadius: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            transform: `translateX(-${current * 100}%)`,
            transition: transition ? "0.5s ease" : "none",
          }}
        >
          {loopBanners.map((banner, index) => (
            <div
              key={index}
              style={{
                minWidth: "100%",
                boxSizing: "border-box",
              }}
            >
              <img
                src={banner.img}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "30px",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>

        <button onClick={prevSlide} style={arrowLeft}>
          {"<"}
        </button>

        <button onClick={nextSlide} style={arrowRight}>
          {">"}
        </button>

        <div style={dotsWrap}>
          {banners.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index + 1)}
              style={{
                ...dotStyle,
                background:
                  current === index + 1 ? "#b30000" : "#ccc",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const arrowLeft = {
  position: "absolute" as const,
  top: "50%",
  left: "30px",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.4)",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "35px",
  height: "35px",
  cursor: "pointer",
};

const arrowRight = {
  ...arrowLeft,
  left: "auto",
  right: "30px",
};

const dotsWrap = {
  position: "absolute" as const,
  bottom: "15px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "8px",
};

const dotStyle = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  cursor: "pointer",
};