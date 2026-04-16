"use client";
import { useEffect, useState } from "react";

export default function BannerMini() {
  const [current, setCurrent] = useState(0);
  const [transition, setTransition] = useState(true);

  const banners = [
    { id: 1, img: "https://picsum.photos/300/150?1" },
    { id: 2, img: "https://picsum.photos/300/150?2" },
    { id: 3, img: "https://picsum.photos/300/150?3" },
    { id: 4, img: "https://picsum.photos/300/150?4" },
    { id: 5, img: "https://picsum.photos/300/150?5" },
  ];

  // duplicate để chạy loop mượt
  const loopBanners = [...banners, ...banners];

  const CARD_WIDTH = 33.3333; // 3 card / màn hình

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (current === banners.length) {
      const timeout = setTimeout(() => {
        setTransition(false);
        setCurrent(0);
      }, 600);

      return () => clearTimeout(timeout);
    }

    const t = setTimeout(() => setTransition(true), 30);
    return () => clearTimeout(t);
  }, [current]);

  return (
    <div className="mt-[120px] flex justify-center">
      <div className="w-full max-w-[1400px] px-1">

        {/* OUTER CLIP */}
        <div style={{
          overflow: "hidden",
          borderRadius: "30px"
        }}>

          {/* TRACK */}
          <div style={{
            display: "flex",
            transform: `translateX(-${current * 33.3333}%)`,
            transition: transition ? "0.6s ease" : "none",
          }}>

            {loopBanners.map((banner, index) => (
              <div
                key={index}
                style={{
                  flex: "0 0 33.3333%",
                  boxSizing: "border-box",
                }}
              >

                {/* CARD WRAPPER */}
                <div style={{
                  margin: "0 10px",   
                  borderRadius: "30px",
                  overflow: "hidden",
                  height: "160px",
                }}>
                  <img
                    src={banner.img}
                    style={{
                      width: "160%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}