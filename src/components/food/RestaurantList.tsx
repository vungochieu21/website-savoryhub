"use client";

import { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import FoodCard from "./FoodCard";
import styles from "./RestaurantList.module.css";
import { useLanguage } from "src/locales/context/LanguageContext";

/* TYPES */
type Food = {
  id: string;
  name: string;
  address: string;
  image?: string;
  rating?: number;
  comments?: number;
  photos?: number;
};

type Props = {
  foods?: Food[]; // nhận foods từ component cha (tùy chọn)
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

export default function RestaurantList({
  foods: initialFoods = [],
  onEdit,
  onDelete,
}: Props) {
  const [foods, setFoods] = useState<Food[]>(initialFoods);
  const [openId, setOpenId] = useState<number | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Nếu component cha truyền foods mới vào thì cập nhật state
  useEffect(() => {
    if (initialFoods.length > 0) {
      setFoods(initialFoods);
    }
  }, [initialFoods]);

  // Chỉ fetch API khi không có foods được truyền từ component cha
  useEffect(() => {
    if (initialFoods.length === 0) {
      fetch("/api/foods")
        .then((res) => res.json())
        .then((data) => setFoods(data));
    }
  }, [initialFoods]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (foods.length === 0) {
    return <p className={styles.emptyText}>{t("no_places")}</p>;
  }

  const displayFoods = foods.slice(0, 20);

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <div className={styles.topSellerHeader}>
          <h2 className={styles.topSellerTitle}>Top Seller</h2>
        </div>
      </div>

      <div ref={wrapperRef} className={styles.grid}>
        {displayFoods.map((food, index) => (
          <div key={index} className={styles.cardWrapper}>
            <FoodCard {...food} />

            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenId(openId === index ? null : index);
              }}
              className={styles.menuBtn}
            >
              ⋮
            </button>

            {openId === index && (
              <div className={styles.menuBox}>
                <div
                  className={styles.menuItem}
                  onClick={() => {
                    onEdit(index);
                    setOpenId(null);
                  }}
                >
                  <FaEdit />
                  {t("edit")}
                </div>

                <div
                  className={`${styles.menuItem} ${styles.menuItemDanger}`}
                  onClick={() => {
                    onDelete(index);
                    setOpenId(null);
                  }}
                >
                  <FaTrash />
                  {t("delete")}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.viewMoreContainer}>
        <Link href="/filter" className={styles.loadMoreBtn}>
          {t("see_more")}
        </Link>
      </div>
    </div>
  );
}