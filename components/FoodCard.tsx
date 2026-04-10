"use client";
import { useState } from "react";

type FoodCardProps = {
  name: string;
  address: string;
  image: string;
  rating: number;
  comments: number;
  photos: number;
  iconComment?: string;
  iconPhoto?: string;
  iconHeart?: string;
};

export default function FoodCard({
  name,
  address,
  image,
  rating,
  comments,
  photos,
  iconComment,
  iconPhoto,
  iconHeart,
}: FoodCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff",
        border: "1px solid #eee",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* IMAGE */}
      <img
        src={image}
        alt={name}
        style={{
          width: "100%",
          height: "140px",
          objectFit: "cover",
        }}
      />

      {/* CONTENT */}
      <div style={{ padding: "10px", color: "#000" }}>
        {/* TÊN QUÁN */}
        <div
          style={{
            fontSize: "15px",
            fontWeight: "bold",
            marginBottom: "4px",
          }}
        >
          {name || "Tên quán..."}
        </div>

        {/* ĐỊA CHỈ */}
        <div
          style={{
            fontSize: "13px",
            color: "#888",
            marginBottom: "4px",
          }}
        >
          {address || "Địa chỉ..."}
        </div>

        {/* ⭐ RATING (👉 ĐÃ ĐƯA XUỐNG DƯỚI) */}
        <div
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
        >
          ⭐ {rating}
        </div>

        {/* BOTTOM ROW */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "13px",
            color: "#555",
          }}
        >
          {/* LEFT */}
          <div style={{ display: "flex", gap: "12px" }}>
            {/* 💬 */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {iconComment ? (
                <img src={iconComment} width={16} />
              ) : (
                <span>💬</span>
              )}
              {comments}
            </div>

            {/* 📷 */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {iconPhoto ? (
                <img src={iconPhoto} width={16} />
              ) : (
                <span>📷</span>
              )}
              {photos}
            </div>
          </div>

          {/* ❤️ */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            style={{
              cursor: "pointer",
              fontSize: "16px",
              transform: liked ? "scale(1.5)" : "scale(1.5)",
              color: liked ? "red" : "#999",
              transition: "0.2s",
            }}
          >
            {iconHeart ? <img src={iconHeart} width={16} /> : "♥"}
          </div>
        </div>
      </div>
    </div>
  );
}