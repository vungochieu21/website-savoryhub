"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./Testimonials.module.css";
import { useLanguage } from "src/locales/context/LanguageContext";

/* MULTI LANG TYPE */
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
      vi: "Giao diện website rất chuyên nghiệp, dễ dàng tìm kiếm thông tin.",
      en: "The website interface is very professional, easy to find information.",
    },
    rating: 4.5,
  },
  {
    name: "Trần Thị Ngọc Anh",
    role: { vi: "Sinh viên", en: "Student" },
    avatar: "https://i.pravatar.cc/100?img=5",
    content: {
      vi: "Web load rất nhanh, đặt hàng cực kỳ tiện lợi.",
      en: "The web loads very fast, ordering is extremely convenient.",
    },
    rating: 4.8,
  },
  {
    name: "Lê Hoàng Nam",
    role: { vi: "Freelancer", en: "Freelancer" },
    avatar: "https://i.pravatar.cc/100?img=8",
    content: {
      vi: "Màu sắc website hài hòa, trải nghiệm người dùng (UX) rất tốt.",
      en: "Harmonious website colors, very good user experience (UX).",
    },
    rating: 4.9,
  },
  {
    name: "Phạm Thu Hương",
    role: { vi: "Nội trợ", en: "Homemaker" },
    avatar: "https://i.pravatar.cc/100?img=10",
    content: {
      vi: "Hình ảnh món ăn trên web rất sắc nét, nhìn là muốn đặt ngay.",
      en: "Food images on the web are very sharp, makes me want to order right away.",
    },
    rating: 4.6,
  },
  {
    name: "Hoàng Văn Thái",
    role: { vi: "Kỹ sư phần mềm", en: "Software engineer" },
    avatar: "https://i.pravatar.cc/100?img=12",
    content: {
      vi: "Code web tối ưu tốt, mượt mà, không gặp lỗi khi thanh toán.",
      en: "Well-optimized code, smooth, no errors during payment.",
    },
    rating: 5.0,
  },
  {
    name: "Vũ Phương Ly",
    role: { vi: "Designer", en: "Designer" },
    avatar: "https://i.pravatar.cc/100?img=16",
    content: {
      vi: "Layout website rất hiện đại, cập nhật xu hướng thiết kế mới.",
      en: "The website layout is very modern, following new design trends.",
    },
    rating: 4.7,
  },
  {
    name: "Đặng Quốc Bảo",
    role: { vi: "Kinh doanh", en: "Business" },
    avatar: "https://i.pravatar.cc/100?img=11",
    content: {
      vi: "Tính năng đa ngôn ngữ hoạt động rất chuẩn xác và hữu ích.",
      en: "The multi-language feature works very accurately and usefully.",
    },
    rating: 4.4,
  },
  {
    name: "Mai Lan Chi",
    role: { vi: "Giáo viên", en: "Teacher" },
    avatar: "https://i.pravatar.cc/100?img=26",
    content: {
      vi: "Hệ thống phản hồi khách hàng trên web rất nhanh chóng.",
      en: "The customer feedback system on the web is very prompt.",
    },
    rating: 4.9,
  },
  {
    name: "Kevin Smith",
    role: { vi: "Khách du lịch", en: "Tourist" },
    avatar: "https://i.pravatar.cc/100?img=33",
    content: {
      vi: "Website giúp tôi tìm địa điểm ăn uống rất dễ dàng khi ở Việt Nam.",
      en: "The website made it very easy for me to find dining spots while in Vietnam.",
    },
    rating: 4.8,
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
          {currentLang === "vi" ? "Đánh giá về Website" : "Website Reviews"}
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