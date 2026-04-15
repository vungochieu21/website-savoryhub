"use client";

import { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import FoodCard from "./FoodCard";

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

  // FETCH API
  useEffect(() => {
    fetch("/api/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  // CLICK NGOÀI MENU ĐỂ ĐÓNG
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
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  if (foods.length === 0) {
    return (
      <p style={emptyText}>
        Chưa có địa điểm nào.
      </p>
    );
  }

  return (
    <div ref={wrapperRef} style={grid}>
      {foods.map((food, index) => (
        <div key={index} style={cardWrapper}>
          <FoodCard {...food} />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenId(
                openId === index ? null : index
              );
            }}
            style={menuBtn}
          >
            ⋮
          </button>

          {openId === index && (
            <div style={menuBox}>
              <div
                style={menuItem}
                onClick={() => {
                  onEdit(index);
                  setOpenId(null);
                }}
              >
                <FaEdit />
                Chỉnh sửa
              </div>

              <div
                style={{
                  ...menuItem,
                  color: "#ef4444",
                  borderBottom: "none",
                }}
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

/* STYLE */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
  marginTop: "30px",
};

const cardWrapper = {
  position: "relative" as const,
};

const emptyText = {
  textAlign: "center" as const,
  marginTop: "30px",
  color: "#777",
  fontSize: "16px",
};

const menuBtn = {
  position: "absolute" as const,
  top: "10px",
  right: "10px",
  width: "34px",
  height: "34px",
  borderRadius: "10px",
  border: "1px solid #eee",
  background: "rgba(255,255,255,0.95)",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "bold",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
};

const menuBox = {
  position: "absolute" as const,
  top: "48px",
  right: "10px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
  zIndex: 100,
  minWidth: "150px",
  overflow: "hidden",
};

const menuItem = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px 16px",
  cursor: "pointer",
  fontSize: "14px",
  borderBottom: "1px solid #f1f1f1",
};