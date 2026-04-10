"use client";
import { useEffect, useState, useRef } from "react";

export default function Banner() {
  const [current, setCurrent] = useState(1);
  const [transition, setTransition] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  const banners = [
    { id: 1, img: "https://picsum.photos/1200/300?1" },
    { id: 2, img: "https://picsum.photos/1200/300?2" },
    { id: 3, img: "https://picsum.photos/1200/300?3" },
  ];

  // clone để loop mượt
  const loopBanners = [
    banners[banners.length - 1],
    ...banners,
    banners[0],
  ];

  const nextSlide = () => setCurrent((prev) => prev + 1);
  const prevSlide = () => setCurrent((prev) => prev - 1);

  // auto chạy
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 👉 đổi 5s cho mượt hơn
    return () => clearInterval(interval);
  }, []);

  // xử lý loop
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
        background: "#e3e3e3",
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
        {/* Slider */}
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
              <div
                style={{
                  minWidth: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ padding: "0 5px" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "300px",
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={banner.img}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/*Nút trái*/}
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
        {/*Nút phải*/}
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
        {/*Dots*/}
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