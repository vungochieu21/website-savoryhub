"use client";

import { useState } from "react";
import { FaComment, FaCamera, FaHeart } from "react-icons/fa";
import styles from "./FoodCard.module.css";

type FoodCardProps = {
  name: string;
  address: string;
  image?: string | null;
  rating?: number;
  comments?: number;
  photos?: number;
};

export default function FoodCard({
  name,
  address,
  image,
  rating = 4.5,
  comments = 0,
  photos = 0,
}: FoodCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div className={styles.card}>
      {/* IMAGE */}
      {image ? (
        <img src={image} alt={name} className={styles.img} />
      ) : (
        <div className={styles.noImg}>No Image</div>
      )}

      {/* CONTENT */}
      <div className={styles.content}>
        <div className={styles.title}>{name || "Tên quán..."}</div>

        <div className={styles.address}>
          {address || "Địa chỉ..."}
        </div>

        <div className={styles.rating}>⭐ {rating}</div>

        <div className={styles.bottom}>
          <div style={{ display: "flex", gap: "12px" }}>
            <div className={styles.iconRow}>
              <FaComment /> {comments}
            </div>

            <div className={styles.iconRow}>
              <FaCamera /> {photos}
            </div>
          </div>

          {/* LIKE */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            className={`${styles.like} ${liked ? styles.likeActive : ""}`}
          >
            <FaHeart />
          </div>
        </div>
      </div>
    </div>
  );
}