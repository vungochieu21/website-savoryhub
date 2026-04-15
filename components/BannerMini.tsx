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
    }, 3000);

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

    const t = setTimeout(() => setTransition(true), 50);
    return () => clearTimeout(t);
  }, [current]);

  return (
    <div className="flex justify-center mt-[130px] py-6">
      
      {/* OUTER WRAPPER (BO GÓC ỔN ĐỊNH) */}
      <div className="w-full max-w-[1430px] px-1">
        
        <div
          style={{
            overflow: "hidden",
            borderRadius: "30px",
          }}
        >
          
          {/* TRACK */}
          <div
            style={{
              display: "flex",
              transform: `translateX(-${current * 25}%)`,
              transition: transition ? "0.6s ease" : "none",
            }}
          >
            {loopBanners.map((banner, index) => (
              
              <div
                key={index}
                style={{
                  flex: "0 0 25%",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              >
                
                {/* CARD */}
                <div
                  style={{
                    height: "140px",
                    borderRadius: "25px",
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}