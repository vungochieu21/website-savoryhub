"use client";
import { useState, useEffect, useRef } from "react";
import FoodCard from "./FoodCard";

type Props = {
  foods: any[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

export default function RestaurantList({ foods, onEdit, onDelete }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // 👉 đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "16px",
        marginTop: "20px",
      }}
    >
      {foods.length === 0 && (
        <div style={{ color: "#888" }}>
          Chưa có địa điểm nào được thêm vào. Hãy thêm địa điểm đi nào!
        </div>
      )}

      {foods.map((item, i) => (
        <div key={i} style={{ position: "relative" }}>
          {/* CARD */}
          <FoodCard {...item} />

          {/* NÚT 3 CHẤM (nhỏ lại) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex(openIndex === i ? null : i);
            }}
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "28px",         // 👈 nhỏ khung
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "6px",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <span style={{ fontSize: "18px", lineHeight: 1 }}>⋮</span>
          </button>

          {/* MENU */}
          {openIndex === i && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                top: "34px",
                right: "6px",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 100,
                minWidth: "140px",
                overflow: "hidden",
              }}
            >
              {/* EDIT */}
              <div
                onClick={() => {
                  onEdit(i);
                  setOpenIndex(null);
                }}
                style={menuItem}
              >
                ✏️ Chỉnh sửa
              </div>

              {/* DELETE */}
              <div
                onClick={() => {
                  onDelete(i);
                  setOpenIndex(null);
                }}
                style={{ ...menuItem, color: "red" }}
              >
                🗑 Xóa
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
const menuItem: React.CSSProperties = {
  padding: "10px 12px",
  cursor: "pointer",
  borderBottom: "1px solid #eee",
};