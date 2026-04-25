"use client";

import styles from "./FoodDetail.module.css";
import foodsData from "src/data/food.json";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";

export default function FoodDetailPage({ params }: any) {
  const router = useRouter();
  const { id } = use(params);

  const food = foodsData.find(
    (item: any) => String(item.id) === String(id)
  );

  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [reactions, setReactions] = useState<any>({});
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <div className={styles.skeleton}>Loading...</div>;
  if (!food) return <div className={styles.notFound}>❌ Không tìm thấy</div>;

  const isOpen = true;

  const comments = food.commentsList || [
    { name: "An", text: "Ngon!", img: "https://i.pravatar.cc/40?1" },
    { name: "Bình", text: "Rất ổn", img: "https://i.pravatar.cc/40?2" }
  ];

  const sides = food.sides || [
    { name: "Trà đá", price: 5000 },
    { name: "Khoai tây", price: 20000 }
  ];

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* BACK */}
      <button className={styles.backBtn} onClick={() => router.back()}>
        <FaArrowLeft /> Quay lại
      </button>

      <div className={styles.card}>
        {/* IMAGE */}
        <div className={styles.imageBox}>
          <img src={food.image} className={styles.image} />

          <div className={styles.status}>
            {isOpen ? "🟢 Đang mở cửa" : "🔴 Đóng cửa"}
          </div>
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>{food.name}</h1>

          <div className={styles.address}>
            <FaMapMarkerAlt /> {food.address}
          </div>

          {/* ⭐ RATING */}
          <div className={styles.starRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                onClick={() => setRating(i)}
                className={styles.star}
              >
                {i <= rating ? "⭐" : "☆"}
              </span>
            ))}
          </div>

          <p className={styles.ratingText}>
            Rating của bạn: {rating}/5
          </p>

          {/* MAP */}
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              food.address
            )}&z=15&output=embed`}
            className={styles.map}
          />

          {/* SIDES */}
          <h3 className={styles.sectionTitle}>🍟 Món phụ</h3>

          {sides.map((s: any, i: number) => (
            <div key={i} className={styles.side}>
              <span>{s.name}</span>
              <b>{s.price.toLocaleString()}đ</b>
            </div>
          ))}

          {/* UPLOAD */}
          <h3 className={styles.sectionTitle}>📸 Thêm ảnh review</h3>

          <input
            type="file"
            className={styles.fileInput}
            onChange={(e: any) => {
              const file = e.target.files[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />

          {preview && (
            <img src={preview} className={styles.preview} />
          )}

          {/* COMMENTS */}
          <h3 className={styles.sectionTitle}>💬 Bình luận</h3>

          {comments.map((c: any, i: number) => (
            <div key={i} className={styles.comment}>
              <img src={c.img} className={styles.avatar} />

              <div className={styles.commentContent}>
                <b>{c.name}</b>
                <p>{c.text}</p>

                <div className={styles.reactions}>
                  <button
                    onClick={() =>
                      setReactions({
                        ...reactions,
                        [i]: {
                          like: (reactions[i]?.like || 0) + 1
                        }
                      })
                    }
                  >
                    👍 {reactions[i]?.like || 0}
                  </button>

                  <button
                    onClick={() =>
                      setReactions({
                        ...reactions,
                        [i]: {
                          dislike: (reactions[i]?.dislike || 0) + 1
                        }
                      })
                    }
                  >
                    👎 {reactions[i]?.dislike || 0}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}