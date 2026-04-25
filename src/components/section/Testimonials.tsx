"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./Testimonials.module.css";
import { useLanguage } from "src/locales/context/LanguageContext";

/* 🔥 MULTI LANG TYPE */
type MultiLang = {
  vi: string;
  en: string;
};

type Testimonial = {
  name: string;
  role: MultiLang;
  avatar: string;
  content: MultiLang;
  rating: number;
};

const data: Testimonial[] = [
  {
    name: "Nguyễn Minh Tuấn",
    role: { vi: "Nhân viên văn phòng", en: "Office worker" },
    avatar: "https://i.pravatar.cc/100?img=1",
    content: {
      vi: "Quán rất phù hợp để đi ăn trưa cùng đồng nghiệp.",
      en: "Great place for lunch with coworkers.",
    },
    rating: 4.5,
  },
  {
    name: "Trần Thị Ngọc Anh",
    role: { vi: "Sinh viên", en: "Student" },
    avatar: "https://i.pravatar.cc/100?img=5",
    content: {
      vi: "Giá ổn mà đồ ăn ngon.",
      en: "Affordable price and delicious food.",
    },
    rating: 4.2,
  },
  {
    name: "Lê Hoàng Nam",
    role: { vi: "Freelancer", en: "Freelancer" },
    avatar: "https://i.pravatar.cc/100?img=8",
    content: {
      vi: "Không gian sạch sẽ, nhân viên thân thiện.",
      en: "Clean space and friendly staff.",
    },
    rating: 4.8,
  },
  {
    name: "Phạm Thu Hương",
    role: { vi: "Nội trợ", en: "Homemaker" },
    avatar: "https://i.pravatar.cc/100?img=10",
    content: {
      vi: "Gia đình mình rất thích ăn ở đây.",
      en: "My family really enjoys eating here.",
    },
    rating: 4.6,
  },
  {
    name: "Hoàng Văn Thái",
    role: { vi: "Kỹ sư phần mềm", en: "Software engineer" },
    avatar: "https://i.pravatar.cc/100?img=12",
    content: {
      vi: "Hương vị đậm đà, đúng chất truyền thống. Sẽ quay lại!",
      en: "Rich traditional flavor. Will come back!",
    },
    rating: 5.0,
  },
  {
    name: "Vũ Phương Ly",
    role: { vi: "Designer", en: "Designer" },
    avatar: "https://i.pravatar.cc/100?img=16",
    content: {
      vi: "Cách bài trí món ăn rất đẹp mắt và tinh tế.",
      en: "Beautiful and elegant food presentation.",
    },
    rating: 4.7,
  },
  {
    name: "Đặng Quốc Bảo",
    role: { vi: "Kinh doanh", en: "Business" },
    avatar: "https://i.pravatar.cc/100?img=11",
    content: {
      vi: "Dịch vụ giao hàng nhanh, đồ ăn vẫn còn nóng hổi.",
      en: "Fast delivery, food still hot.",
    },
    rating: 4.4,
  },
  {
    name: "Mai Lan Chi",
    role: { vi: "Giáo viên", en: "Teacher" },
    avatar: "https://i.pravatar.cc/100?img=26",
    content: {
      vi: "Thực đơn đa dạng, nhiều món thanh đạm dễ ăn.",
      en: "Diverse menu with many light and healthy dishes.",
    },
    rating: 4.9,
  },
];

export default function Testimonials() {
  const [isHover, setIsHover] = useState(false);
  const { lang } = useLanguage();

  const currentLang = lang === "en" ? "en" : "vi";

  return (
    <section className={styles.section}>
      {/* TITLE */}
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>
          {currentLang === "vi" ? "Đánh giá khách hàng" : "Customer Reviews"}
        </h2>
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

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <h3 className={styles.name}>{item.name}</h3>
                  <p className={styles.role}>
                    {item.role[currentLang]}
                  </p>
                </div>
              </div>

              {/* RATING */}
              <div className={styles.rating}>
                <FaStar size={12} />
                <span className={styles.ratingText}>{item.rating}</span>
              </div>

              {/* CONTENT */}
              <p className={styles.content}>
                {item.content[currentLang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}