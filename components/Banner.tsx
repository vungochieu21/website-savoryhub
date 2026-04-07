"use client";
import { useEffect, useState, useRef } from "react";

export default function Banner() {
  const [current, setCurrent] = useState(1);
  const [transition, setTransition] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  // 👉 data banner (PHẢI nằm trong component)
  const banners = [
    { id: 1, img: "https://picsum.photos/1200/300?1" },
    { id: 2, img: "https://picsum.photos/1200/300?2" },
    { id: 3, img: "https://picsum.photos/1200/300?3" },
  ];

  // 👉 clone
  const loopBanners = [
    banners[banners.length - 1],
    ...banners,
    banners[0],
  ];

  // 👉 nút điều khiển
  const nextSlide = () => setCurrent((prev) => prev + 1);
  const prevSlide = () => setCurrent((prev) => prev - 1);

  // 👉 auto chạy
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // 👉 xử lý loop
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

    const t = setTimeout(() => setTransition(true), 50);
    return () => clearTimeout(t);
  }, [current]);

  return (
    <div
      style={{
        background: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        padding: "20px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* 🔹 Slider */}
        <div
          ref={sliderRef}
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
                padding: "0 5px",
                boxSizing: "border-box",
              }}
            >
              <img
                src={banner.img}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </div>
          ))}
        </div>

        {/* 🔹 Nút trái */}
        <button
          onClick={prevSlide}
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.4)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            cursor: "pointer",
          }}
        >
          {"<"}
        </button>

        {/* 🔹 Nút phải */}
        <button
          onClick={nextSlide}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.4)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            cursor: "pointer",
          }}
        >
          {">"}
        </button>

        {/* 🔹 Dots */}
        <div
          style={{
            position: "absolute",
            bottom: "15px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
          }}
        >
          {banners.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index + 1)}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background:
                  current === index + 1 ? "#1f4e79" : "#ccc",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}