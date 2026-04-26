"use client";

import { FaComment, FaCamera, FaHeart, FaStar } from "react-icons/fa";
import styles from "./FoodCard.module.css";
import { useFavorites } from "src/locales/context/FavoriteContext";
import { useRouter } from "next/navigation";
import { useLanguage } from "src/locales/context/LanguageContext";

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

  const router = useRouter();
  const { t } = useLanguage();

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
    <div
      className={styles.card}
      onClick={() => router.push(`/food/${id}`)}
    >

      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        {image ? (
          <img src={image} alt={t(name)} className={styles.img} />
        ) : (
          <div className={styles.noImg}>
             noodle {t("no_image")}
          </div>
        )}

        <div className={styles.overlay}></div>

        <div className={styles.ratingBadge}>
          <FaStar /> {rating}
        </div>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        <div className={styles.title}>
          {/* FIX: Bọc t() để dịch name_x */}
          {t(name) || t("shop_name_placeholder")}
        </div>

        <div className={styles.address}>
          {/* FIX: Bọc t() để dịch addr_x */}
          {t(address) || t("address_placeholder")}
        </div>

        <div className={styles.bottom}>
          <div className={styles.meta}>
            <div className={styles.iconRow}>
              <FaComment /> {comments}
            </div>

            <div className={styles.iconRow}>
              <FaCamera /> {photos}
            </div>
          </div>

          {/* ❤️ */}
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