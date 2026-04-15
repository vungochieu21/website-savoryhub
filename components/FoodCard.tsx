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
      {image ? (
        <img src={image} alt={name} style={img} />
      ) : (
        <div style={noImg}>No Image</div>
      )}

      <div style={{ padding: "10px" }}>
        <div style={title}>{name || "Tên quán..."}</div>

        <div style={addressStyle}>
          {address || "Địa chỉ..."}
        </div>

        <div style={ratingStyle}>⭐ {rating}</div>

        {/* BOTTOM */}
        <div style={bottom}>
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={iconRow}>
              <FaComment /> {comments}
            </div>

            <div style={iconRow}>
              <FaCamera /> {photos}
            </div>
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            style={{
              cursor: "pointer",
              color: liked ? "red" : "#999",
              fontSize: "16px",
            }}
          >
            <FaHeart />
          </div>
        </div>
      </div>
    </div>
  );
}

/* STYLE */

const card = {
  width: "100%",
  borderRadius: "12px",
  overflow: "hidden",
  background: "#fff",
  border: "1px solid #eee",
  cursor: "pointer",
  transition: "0.2s",
};

const img = {
  width: "100%",
  height: "140px",
  objectFit: "cover" as const,
};

const noImg = {
  width: "100%",
  height: "140px",
  background: "#eee",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#888",
};

const title = {
  fontSize: "15px",
  fontWeight: "bold",
};

const addressStyle = {
  fontSize: "13px",
  color: "#888",
};

const ratingStyle = {
  fontSize: "14px",
  fontWeight: "bold",
  margin: "6px 0",
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
};