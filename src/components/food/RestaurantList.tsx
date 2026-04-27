"use client";

import { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link"; // Thêm để điều hướng
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
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

export default function RestaurantList({
  onEdit,
  onDelete,
}: Props) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    fetch("/api/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

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

  // Ở trang chủ/danh sách này, chúng ta chỉ hiện tối đa ví dụ 8 hoặc 12 món thôi
  const displayFoods = foods.slice(0, 20);

  return (
    <div className={styles.container}>
      <div ref={wrapperRef} className={styles.grid}>
        {displayFoods.map((food, index) => (
          <div key={index} className={styles.cardWrapper}>
            <FoodCard {...food} />

            {/* MENU BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenId(openId === index ? null : index);
              }}
              className={styles.menuBtn}
            >
              ⋮
            </button>

            {/* DROPDOWN */}
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

      {/* NÚT XEM THÊM - ĐẨY SANG TRANG FILTER */}
      <div className={styles.viewMoreContainer}>
        <Link href="/filter" className={styles.loadMoreBtn}>
          {t("see_more")}
        </Link>
      </div>
    </div>
  );
}