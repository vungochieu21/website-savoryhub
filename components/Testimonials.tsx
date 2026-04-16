"use client";

import { useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  content: string;
};

const data: Testimonial[] = [
  {
    name: "Nguyễn Minh Tuấn",
    role: "Nhân viên văn phòng",
    avatar: "https://i.pravatar.cc/100?img=1",
    content: "Quán rất phù hợp để đi ăn trưa cùng đồng nghiệp.",
  },
  {
    name: "Trần Thị Ngọc Anh",
    role: "Sinh viên",
    avatar: "https://i.pravatar.cc/100?img=5",
    content: "Giá ổn mà đồ ăn ngon.",
  },
  {
    name: "Lê Hoàng Nam",
    role: "Freelancer",
    avatar: "https://i.pravatar.cc/100?img=8",
    content: "Không gian sạch sẽ, nhân viên thân thiện.",
  },
  {
    name: "Phạm Thu Hương",
    role: "Nội trợ",
    avatar: "https://i.pravatar.cc/100?img=10",
    content: "Gia đình mình rất thích ăn ở đây.",
  },
];

export default function Testimonials() {
  const [isHover, setIsHover] = useState(false);

  // 🔥 random rating
  const ratings = useMemo(() => {
    return [...data, ...data, ...data].map(() =>
      (Math.random() * 1.5 + 3.5).toFixed(1)
    );
  }, []);

  // 🔥 TÍNH CHUẨN PIXEL (KHÔNG GIẬT)
  const CARD_WIDTH = 300;
  const GAP = 24; // gap-6 = 24px
  const ITEM_COUNT = data.length;

  const scrollWidth = (CARD_WIDTH + GAP) * ITEM_COUNT;

  return (
    <section className="py-16 overflow-hidden">
      
      {/* TITLE */}
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Đánh giá khách hàng
        </h2>
      </div>

      {/* SCROLL */}
      <div
        className="overflow-hidden px-10"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div
          className="flex gap-6 w-max"
          style={{
            animationName: "scroll",
            animationDuration: "20s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: isHover ? "paused" : "running",
          }}
        >
          {[...data, ...data, ...data].map((item, index) => (
            <div
              key={index}
              className="w-[300px] flex-shrink-0 bg-white p-6 rounded-2xl shadow-md"
            >
              {/* HEADER */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />

                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>
                </div>
              </div>

              {/* ⭐ RATING FIX */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "10px",
                  color: "#f59e0b",
                  fontWeight: 600,
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaStar size={14} />
                </div>

                <div
                  style={{
                    height: "16px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  {ratings[index]}
                </div>
              </div>

              {/* CONTENT */}
              <p className="text-gray-600 text-sm">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 ANIMATION PIXEL PERFECT */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${scrollWidth}px);
          }
        }
      `}</style>

      {/* FADE 2 BÊN */}
      <style jsx>{`
        section > div:nth-child(2) {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }
      `}</style>
    </section>
  );
}