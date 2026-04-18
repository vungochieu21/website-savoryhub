"use client";

import { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import FoodCard from "./FoodCard";

/* THEME */
const theme = {
  bg: "#000000",
  card: "#333333",
  text: "#ffffff",
  border: "#333333",
  hover: "#999999",
  danger: "#ff0000",
  shadow: "0 10px 25px rgba(0,0,0,0.25)",
};

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

  /* FETCH API */
  useEffect(() => {
    fetch("/api/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  /* CLICK OUTSIDE */
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
    return <p style={emptyText}>Chưa có địa điểm nào.</p>;
  }

  return (
    <div ref={wrapperRef} style={grid}>
      {foods.map((food, index) => (
        <div key={index} style={cardWrapper}>
          <FoodCard {...food} />

          {/* MENU BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenId(openId === index ? null : index);
            }}
            style={menuBtn}
          >
            ⋮
          </button>

          {/* DROPDOWN */}
          {openId === index && (
            <div style={menuBox}>
              
              <div
                style={menuItem}
                onClick={() => {
                  onEdit(index);
                  setOpenId(null);
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = theme.hover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <FaEdit />
                Chỉnh sửa
              </div>

              <div
                style={{
                  ...menuItem,
                  color: theme.danger,
                  borderBottom: "none",
                }}
                onClick={() => {
                  onDelete(index);
                  setOpenId(null);
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#999999")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
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
  color: "#000000",
  fontSize: "16px",
};

/* MENU BUTTON (GLASS STYLE) */
const menuBtn = {
  position: "absolute" as const,
  top: "10px",
  right: "10px",

  width: "20px",
  height: "29px",

  borderRadius: "7px",
  border: `1px solid ${theme.border}`,

  background: "#333333",
  color: theme.text,

  cursor: "pointer",

  backdropFilter: "blur(6px)",

  fontSize: "18px",
  fontWeight: "bold",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  boxShadow: theme.shadow,
};

/*  DROPDOWN */
const menuBox = {
  position: "absolute" as const,
  top: "48px",
  right: "10px",

  background: theme.card,
  color: theme.text,

  borderRadius: "12px",
  boxShadow: theme.shadow,

  zIndex: 100,
  minWidth: "150px",
  overflow: "hidden",
  border: `1px solid ${theme.border}`,
};

/* ITEM */
const menuItem = {
  display: "flex",
  alignItems: "center",
  gap: "10px",

  padding: "12px 16px",
  cursor: "pointer",

  fontSize: "14px",

  borderBottom: `1px solid ${theme.border}`,
  transition: "0.2s",
};