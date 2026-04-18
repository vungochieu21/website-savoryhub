"use client";

import { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import FoodCard from "./FoodCard";
import styles from "./RestaurantList.module.css";

/* TYPES */
type Food = {
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
    return <p className={styles.emptyText}>Chưa có địa điểm nào.</p>;
  }

  return (
    <div ref={wrapperRef} className={styles.grid}>
      {foods.map((food, index) => (
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
                Chỉnh sửa
              </div>

              <div
                className={`${styles.menuItem} ${styles.menuItemDanger}`}
                onClick={() => {
                  onDelete(index);
                  setOpenId(null);
                }}
              >
                <FaTrash />
                Xóa
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}