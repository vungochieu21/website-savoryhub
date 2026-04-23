"use client";

import { FaComment, FaCamera, FaHeart } from "react-icons/fa";
import styles from "./FoodCard.module.css";
import { useFavorites } from "src/locales/context/FavoriteContext";

type FoodCardProps = {
  id: string;
  name: string;
  address: string;
  image?: string | null;
  rating?: number;
  comments?: number;
  photos?: number;
};

export default function FoodCard({
  id,
  name,
  address,
  image,
  rating = 4.5,
  comments = 0,
  photos = 0,
}: FoodCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const liked = isFavorite(id);

  const item = {
    id,
    name,
    address,
    image,
    rating,
    comments,
    photos,
  };

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
              toggleFavorite(item);
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