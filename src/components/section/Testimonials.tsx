"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./Testimonials.module.css";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
};

const data: Testimonial[] = [
  {
    name: "Nguyễn Minh Tuấn",
    role: "Nhân viên văn phòng",
    avatar: "https://i.pravatar.cc/100?img=1",
    content: "Quán rất phù hợp để đi ăn trưa cùng đồng nghiệp.",
    rating: 4.5,
  },
  {
    name: "Trần Thị Ngọc Anh",
    role: "Sinh viên",
    avatar: "https://i.pravatar.cc/100?img=5",
    content: "Giá ổn mà đồ ăn ngon.",
    rating: 4.2,
  },
  {
    name: "Lê Hoàng Nam",
    role: "Freelancer",
    avatar: "https://i.pravatar.cc/100?img=8",
    content: "Không gian sạch sẽ, nhân viên thân thiện.",
    rating: 4.8,
  },
  {
    name: "Phạm Thu Hương",
    role: "Nội trợ",
    avatar: "https://i.pravatar.cc/100?img=10",
    content: "Gia đình mình rất thích ăn ở đây.",
    rating: 4.6,
  },
  {
    name: "Hoàng Văn Thái",
    role: "Kỹ sư phần mềm",
    avatar: "https://i.pravatar.cc/100?img=12",
    content: "Hương vị đậm đà, đúng chất truyền thống. Sẽ quay lại!",
    rating: 5.0,
  },
  {
    name: "Vũ Phương Ly",
    role: "Designer",
    avatar: "https://i.pravatar.cc/100?img=16",
    content: "Cách bài trí món ăn rất đẹp mắt và tinh tế.",
    rating: 4.7,
  },
  {
    name: "Đặng Quốc Bảo",
    role: "Kinh doanh",
    avatar: "https://i.pravatar.cc/100?img=11",
    content: "Dịch vụ giao hàng nhanh, đồ ăn vẫn còn nóng hổi.",
    rating: 4.4,
  },
  {
    name: "Mai Lan Chi",
    role: "Giáo viên",
    avatar: "https://i.pravatar.cc/100?img=26",
    content: "Thực đơn đa dạng, nhiều món thanh đạm dễ ăn.",
    rating: 4.9,
  },
];

export default function Testimonials() {
  const [isHover, setIsHover] = useState(false);

  return (
    <section className={styles.section}>
      {/* TITLE */}
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>Đánh giá khách hàng</h2>
      </div>

      {/* SCROLL */}
      <div
        className={styles.scrollWrapper}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div
          className={`${styles.track} ${isHover ? styles.trackPause : ""}`}
        >
          {[...data, ...data].map((item, index) => (
            <div key={index} className={styles.card}>
              {/* HEADER */}
              <div className={styles.header}>
                <img
                  src={item.avatar}
                  alt={item.name}
                  width={50}
                  height={50}
                  className={styles.avatar}
                />

                <div>
                  <h3 className={styles.name}>{item.name}</h3>
                  <p className={styles.role}>{item.role}</p>
                </div>
              </div>

              {/* RATING */}
              <div className={styles.rating}>
                <FaStar size={12} />
                <span className={styles.ratingText}>{item.rating}</span>
              </div>

              {/* CONTENT */}
              <p className={styles.content}>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}