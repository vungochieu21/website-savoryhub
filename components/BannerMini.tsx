"use client";
import { useEffect, useState } from "react";
export default function Banner() {
  const [current, setCurrent] = useState(0);
  const [transition, setTransition] = useState(true);
  const banners = [
    { id: 1, img: "https://picsum.photos/300/150?1" },
    { id: 2, img: "https://picsum.photos/300/150?2" },
    { id: 3, img: "https://picsum.photos/300/150?3" },
    { id: 4, img: "https://picsum.photos/300/150?4" },
    { id: 5, img: "https://picsum.photos/300/150?5" },
  ];
  const loopBanners = [...banners, ...banners];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (current >= banners.length) {
      setTimeout(() => {
        setTransition(false);
        setCurrent(0);
      }, 500);
    }
    const t = setTimeout(() => setTransition(true), 50);
    return () => clearTimeout(t);
  }, [current]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1190px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            transform: `translateX(-${current * 310}px)`,
            transition: transition ? "0.5s ease" : "none",
          }}
        >
          {loopBanners.map((banner, index) => (
            <div
              key={index}
              style={{
                width: "300px",
                height: "150px",
                borderRadius: "10px",
                overflow: "hidden", //QUAN TRỌNG
                flexShrink: 0,
              }}
            >
              <img
                src={banner.img}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block", //fix bug lệch layout
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}