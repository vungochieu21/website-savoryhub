"use client";

import styles from "./FoodDetail.module.css";
import foodsData from "src/data/food.json";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaStar, FaUtensils, FaCommentAlt, FaArrowRight } from "react-icons/fa"; // Thêm FaArrowRight
import { useLanguage } from "src/locales/context/LanguageContext";

export default function FoodDetailPage({ params }: any) {
  const router = useRouter();
  const { t } = useLanguage();
  const { id } = use(params);
  
  const food = foodsData.find((item: any) => String(item.id) === String(id));

  const [rating, setRating] = useState(0);

  const availableSides = [
    { name: t("side_kimchi"), price: 15000 },
    { name: t("side_seaweed_soup"), price: 20000 },
    { name: t("side_cheese_fries"), price: 35000 },
    { name: t("side_passion_tea"), price: 25000 },
    { name: t("side_dumplings"), price: 28000 },
    { name: t("side_tuna_salad"), price: 45000 }
  ];

  const virtualReviews = [
    { 
      name: "Trần Thế Vinh", 
      role: t("role_admin"), 
      tag: styles.admin, 
      text: t("review_vinh"), 
      img: "https://i.pravatar.cc/150?u=vinh" 
    },
    { 
      name: "Ngọc Mai", 
      role: t("role_guide"), 
      tag: styles.guide, 
      text: t("review_mai"), 
      img: "https://i.pravatar.cc/150?u=mai" 
    },
    { 
      name: "Lê Tuấn", 
      role: t("role_member"), 
      tag: styles.member, 
      text: t("review_tuan"), 
      img: "https://i.pravatar.cc/150?u=tuan" 
    },
    { 
      name: "Minh Thư", 
      role: t("role_member"), 
      tag: styles.member, 
      text: t("review_thu"), 
      img: "https://i.pravatar.cc/150?u=thu" 
    }
  ];

  if (!food) return <div className={styles.page}>❌ {t("not_found")}</div>;

  return (
    <div className={styles.page}>
      <motion.button 
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className={styles.backBtn} 
        onClick={() => router.back()}
      >
        <FaArrowLeft /> {t("back")}
      </motion.button>

      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        className={styles.card}
      >
        <img src={food.image} className={styles.image} alt={t(food.name)} />

        <div className={styles.content}>
          <h1 className={styles.title}>{t(food.name)}</h1>
          
          <p style={{ color: 'var(--text-sub)', fontSize: '14px' }}>📍 {t(food.address)}</p>

          <div className={styles.ratingContainer}>
            <div className={styles.ratingSection}>
              <p style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>{t("rating_title")}</p>
              <div style={{ display: 'flex' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <FaStar
                    key={s}
                    className={styles.star}
                    color={s <= rating ? "#ffc107" : "#e0e0e0"} 
                    onClick={() => setRating(s)}
                  />
                ))}
              </div>
            </div>

            {/* Bọc input và mũi tên vào inputWrapper */}
            <div className={styles.inputWrapper}>
              <textarea 
                className={styles.commentInput} 
                placeholder={t("comment_placeholder")}
              />
              <div className={styles.sendArrow}>
                <FaArrowRight size={18} />
              </div>
            </div>
          </div>

          <h3 style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaUtensils size={18} color="#b30000" /> {t("suggested_sides")}
          </h3>
          <div className={styles.sideGrid}>
            {availableSides.map((side, i) => (
              <div key={i} className={styles.sideItem}>
                <span style={{ fontSize: '14px' }}>{side.name}</span>
                <b>{side.price.toLocaleString()}đ</b>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaCommentAlt size={16} /> {t("community_reviews")} ({virtualReviews.length})
          </h3>
          {virtualReviews.map((rev, i) => (
            <div key={i} className={styles.commentBox}>
              <img src={rev.img} className={styles.avatar} alt="avatar" />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <b style={{ fontSize: '15px' }}>{rev.name}</b>
                  <span className={`${styles.roleTag} ${rev.tag}`}>{rev.role}</span>
                </div>
                <p style={{ color: 'var(--text-sub)', marginTop: '5px', fontSize: '14px', lineHeight: '1.5' }}>
                  {rev.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}