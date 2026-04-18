"use client";
import { useState } from "react";
import { FaComment, FaCamera, FaHeart } from "react-icons/fa";

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
    <div style={card}>
      {/* IMAGE */}
      {image ? (
        <img src={image} alt={name} style={img} />
      ) : (
        <div style={noImg}>No Image</div>
      )}

      {/* CONTENT */}
      <div style={{ padding: "12px" }}>
        <div style={title}>{name || "Tên quán..."}</div>

        <div style={addressStyle}>
          {address || "Địa chỉ..."}
        </div>

        <div style={ratingStyle}>⭐ {rating}</div>

        <div style={bottom}>
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={iconRow}>
              <FaComment /> {comments}
            </div>

            <div style={iconRow}>
              <FaCamera /> {photos}
            </div>
          </div>

          {/* LIKE */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            style={{
              cursor: "pointer",
              color: liked ? "var(--like)" : "var(--muted-text)",
              fontSize: "16px",
              transition: "0.2s",
              transform: liked ? "scale(1.2)" : "scale(1)",
            }}
          >
            <FaHeart />
          </div>
        </div>
      </div>
    </div>
  );
}
  
{/* STYPE */}
const card = {
  width: "100%",
  borderRadius: "14px",
  overflow: "hidden",
  background: "var(--card)",
  color: "var(--card-text)",
  border: "1px solid var(--border)",
  cursor: "pointer",
  transition: "0.25s",
  boxShadow: "var(--shadow)",
};

const img = {
  width: "100%",
  height: "150px",
  objectFit: "cover" as const,
};

const noImg = {
  width: "100%",
  height: "150px",
  background: "var(--no-img-bg)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--muted-text)",
  fontSize: "13px",
};

const title = {
  fontSize: "15px",
  fontWeight: "600",
  color: "var(--card-text)",
};

const addressStyle = {
  fontSize: "13px",
  color: "var(--muted-text)",
  marginTop: "2px",
};

const ratingStyle = {
  fontSize: "14px",
  fontWeight: "600",
  margin: "6px 0",
  color: "var(--card-text)",
};

const bottom = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const iconRow = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  fontSize: "13px",
  color: "var(--muted-text)",
};