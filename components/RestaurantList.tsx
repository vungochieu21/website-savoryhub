"use client";
import FoodCard from "./FoodCard";

type Props = {
  foods: any[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

export default function RestaurantList({ foods, onEdit, onDelete }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "16px",
        marginTop: "20px",
      }}
    >
      {foods.length === 0 && (
        <div style={{ color: "#888" }}>
          Chưa có quán nào. Nhấn ➕ để thêm.
        </div>
      )}

      {foods.map((item, i) => (
        <div key={i} style={{ position: "relative" }}>
          {/* CARD */}
          <FoodCard {...item} />

          {/* ✏️ EDIT */}
          <button
            onClick={() => onEdit(i)}
            style={{
              position: "absolute",
              top: "8px",
              left: "8px",
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            ✏️
          </button>

          {/* ❌ DELETE */}
          <button
            onClick={() => onDelete(i)}
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}