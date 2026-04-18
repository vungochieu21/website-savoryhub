"use client";
import { useEffect, useState } from "react";

export default function BannerMini() {
  const [current, setCurrent] = useState(0);
  const [transition, setTransition] = useState(true);

  const banners = [
    { id: 1, img: "https://wallpapercat.com/w/full/0/a/b/610710-3840x2160-desktop-4k-sushi-wallpaper-image.jpg" },
    { id: 2, img: "https://images.hdqwalls.com/wallpapers/pubg-kfc-lq.jpg" },
    { id: 3, img: "https://wallpapercat.com/w/full/a/0/a/111828-2048x1536-desktop-hd-starbucks-background.jpg" },
    { id: 4, img: "https://wallpaperaccess.com/full/767283.jpg" },
    { id: 5, img: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/e14621138253883.622d7b23cc6ea.png" },
  ];

  const loopBanners = [...banners, ...banners];
  const CARD_WIDTH = 33.3333;

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