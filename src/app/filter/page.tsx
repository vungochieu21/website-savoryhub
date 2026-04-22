"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Navbar from "src/components/layout/Navbar";
import Footer from "src/components/layout/Footer";
import FoodCard from "src/components/food/FoodCard";
import foodsData from "src/data/food.json";
import Dropdown from "src/components/ui/Dropdown";

/* TYPES */
type Food = {
  id?: number;
  name: string;
  type: string;
  price: number;
  rating: number;
  address: string;
  image: string;
  comments?: number;
  photos?: number;
  tags?: string[];
};

/* CONSTANT */
const PRICE_RANGE = {
  LOW: 50000,
  HIGH: 150000,
};

/* COMPONENT */
export default function FilterPage() {
  const [type, setType] = useState("all");
  const [price, setPrice] = useState("all");
  const [rating, setRating] = useState("all");
  const [tag, setTag] = useState("all");
  const [open, setOpen] = useState<string | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

const foods = (Array.isArray(foodsData) ? foodsData : []) as Food[];

  /* CLICK OUTSIDE */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* FILTER */
  const filteredFoods = useMemo(() => {
    return foods.filter((item) => {
      if (type !== "all" && item.type !== type) return false;

      if (price !== "all") {
        if (price === "low" && item.price > PRICE_RANGE.LOW) return false;
        if (
          price === "mid" &&
          (item.price < PRICE_RANGE.LOW || item.price > PRICE_RANGE.HIGH)
        )
          return false;
        if (price === "high" && item.price < PRICE_RANGE.HIGH) return false;
      }

      if (rating !== "all") {
        if (rating === "1-2" && !(item.rating >= 1 && item.rating < 2))
          return false;
        if (rating === "2-3" && !(item.rating >= 2 && item.rating < 3))
          return false;
        if (rating === "3-4" && !(item.rating >= 3 && item.rating < 4))
          return false;
        if (rating === "4-5" && !(item.rating >= 4 && item.rating < 5))
          return false;
        if (rating === "5" && item.rating < 5) return false;
      }

      if (tag !== "all" && !(item.tags || []).includes(tag)) return false;

      return true;
    });
  }, [foods, type, price, rating, tag]);

  /* UI */
  return (
    <div ref={wrapperRef}>
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

        {/* FILTER */}
        <div className="flex flex-wrap gap-3 p-4">
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
            open={open}
            setOpen={setOpen}
          />

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
            open={open}
            setOpen={setOpen}
          />

          <Dropdown
            id="rating"
            value={rating}
            setValue={setRating}
            label="Rating"
            options={[
              { value: "all", label: "Đánh giá" },
              { value: "1-2", label: "⭐ 1 - 2" },
              { value: "2-3", label: "⭐ 2 - 3" },
              { value: "3-4", label: "⭐ 3 - 4" },
              { value: "4-5", label: "⭐ 4 - 5" },
              { value: "5", label: "⭐ 5" },
            ]}
            open={open}
            setOpen={setOpen}
          />

          <Dropdown
            id="tag"
            value={tag}
            setValue={setTag}
            label="Đặc tính"
            options={[
              { value: "all", label: "Khẩu vị" },
              { value: "chay", label: "Đồ ăn chay" },
              { value: "cay", label: "Vị cay" },
              { value: "mặn", label: "Vị mặn" },
              { value: "ngọt", label: "Vị ngọt" },
            ]}
            open={open}
            setOpen={setOpen}
          />
        </div>

        {/* LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((item, index) => (
              <FoodCard
                key={item.id ?? item.name ?? index}
                name={item.name}
                address={item.address}
                image={item.image}
                rating={item.rating}
                comments={item.comments}
                photos={item.photos}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Không tìm thấy kết quả
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}