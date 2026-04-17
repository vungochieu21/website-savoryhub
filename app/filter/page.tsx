"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import foodsData from "@/data/food.json";

// ⭐ ADD FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function FilterPage() {
  const [type, setType] = useState("all");
  const [price, setPrice] = useState("all");
  const [rating, setRating] = useState("all");
  const [tag, setTag] = useState("all");

  const [open, setOpen] = useState<string | null>(null);

  const foods = Array.isArray(foodsData) ? foodsData : [];

  const filteredFoods = foods.filter((item: any) => {
    if (type !== "all" && item.type !== type) return false;

    if (price !== "all") {
      if (price === "low" && item.price > 50000) return false;
      if (price === "mid" && (item.price < 50000 || item.price > 150000)) return false;
      if (price === "high" && item.price < 150000) return false;
    }

    // rating (giữ nguyên logic mới)
    if (rating !== "all") {
      if (rating === "1-2" && !(item.rating >= 1 && item.rating < 2)) return false;
      if (rating === "2-3" && !(item.rating >= 2 && item.rating < 3)) return false;
      if (rating === "3-4" && !(item.rating >= 3 && item.rating < 4)) return false;
      if (rating === "4-5" && !(item.rating >= 4 && item.rating < 5)) return false;
      if (rating === "5" && item.rating !== 5) return false;
    }

    if (tag !== "all" && !(item.tags || []).includes(tag)) return false;

    return true;
  });

  const Dropdown = ({
    label,
    value,
    setValue,
    options,
    id,
  }: any) => {
    return (
      <div className="relative">
        <button
          onClick={() => setOpen(open === id ? null : id)}
          className="border border-red-500 text-red-500 px-4 py-2 rounded-md min-w-[140px] flex justify-between items-center"
        >
          {options.find((o: any) => o.value === value)?.label || label}
          <span>▼</span>
        </button>

        <div
          className={`absolute left-0 mt-2 w-full bg-white border border-red-500 rounded-md shadow-lg overflow-hidden transition-all duration-200 z-50 ${
            open === id
              ? "max-h-60 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          {options.map((opt: any, index: number) => (
            <div
              key={index}
              onClick={() => {
                setValue(opt.value);
                setOpen(null);
              }}
              className="px-3 py-2 hover:bg-red-500 hover:text-white cursor-pointer"
            >
              {opt.label}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div onClick={() => setOpen(null)}>
      <Navbar />

      <div
        style={{
          maxWidth: "1350px",
          margin: "0 auto",
          padding: "20px 1px",
        }}
      >
        <h2 className="text-lg font-semibold px-4 mt-[100px]">
          Tìm kiếm nâng cao
        </h2>

        <div
          className="flex flex-wrap gap-3 p-4 justify-start"
          onClick={(e) => e.stopPropagation()}
        >
          {/* TYPE */}
          <Dropdown
            id="type"
            value={type}
            setValue={setType}
            label="Loại"
            options={[
              { value: "all", label: "Tất cả" },
              { value: "food", label: "Quán ăn" },
              { value: "drink", label: "Đồ uống" },
              { value: "fastfood", label: "Đồ ăn nhanh" },
              { value: "buffet", label: "Buffet" },
            ]}
          />

          {/* PRICE */}
          <Dropdown
            id="price"
            value={price}
            setValue={setPrice}
            label="Giá"
            options={[
              { value: "all", label: "Giá cả" },
              { value: "low", label: "Dưới 50k" },
              { value: "mid", label: "50k - 150k" },
              { value: "high", label: "Trên 150k" },
            ]}
          />

          {/* ⭐ RATING ICON FIX */}
          <Dropdown
            id="rating"
            value={rating}
            setValue={setRating}
            label="Rating"
            options={[
              { value: "all", label: "Đánh giá" },

              {
                value: "1-2",
                label: (
                  <span>
                  <FontAwesomeIcon icon={faStar} /> 1 - 2
                  </span>
                ),
              },
              {
                value: "2-3",
                label: (
                  <span>
                   <FontAwesomeIcon icon={faStar} /> 2 - 3
                  </span>
                ),
              },
              {
                value: "3-4",
                label: (
                  <span>
                   <FontAwesomeIcon icon={faStar} /> 3 - 4
                  </span>
                ),
              },
              {
                value: "4-5",
                label: (
                  <span>
                   <FontAwesomeIcon icon={faStar} /> 4 - 5
                  </span>
                ),
              },
              {
                value: "5",
                label: (
                  <span>
                   <FontAwesomeIcon icon={faStar} /> 5
                  </span>
                ),
              },
            ]}
          />

          {/* TAG */}
          <Dropdown
            id="tag"
            value={tag}
            setValue={setTag}
            label="Đặc tính"
            options={[
              { value: "all", label: "Khẩu vị" },
              { value: "chay", label: "đồ ăn Chay" },
              { value: "cay", label: "vị Cay" },
              { value: "mặn", label: "vị Mặn" },
              { value: "ngọt", label: "vị Ngọt" },
            ]}
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
          {filteredFoods.map((item: any, index: number) => (
            <FoodCard
              key={item.id ?? item.name ?? index}
              name={item.name}
              address={item.address}
              image={item.image}
              rating={item.rating}
              comments={item.comments}
              photos={item.photos}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}