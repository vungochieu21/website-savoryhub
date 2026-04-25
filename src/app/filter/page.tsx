"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  region?: string;
  comments?: number;
  photos?: number;
  tags?: string[];
};

const PRICE_RANGE = {
  LOW: 50000,
  HIGH: 150000,
};

export default function FilterPage() {
  const [type, setType] = useState("all");
  const [price, setPrice] = useState("all");
  const [rating, setRating] = useState("all");
  const [tag, setTag] = useState("all");
  const [region, setRegion] = useState("all");
  const [open, setOpen] = useState<string | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const foods: Food[] = useMemo(() => {
    return Array.isArray(foodsData) ? foodsData : [];
  }, []);

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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
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

      // REGION FILTER
      if (region !== "all" && item.region !== region) return false;

      return true;
    });
  }, [foods, type, price, rating, tag, region]);

  /* check đang filter */
  const isFiltering =
    type !== "all" ||
    price !== "all" ||
    rating !== "all" ||
    tag !== "all" ||
    region !== "all";

  return (
    <div ref={wrapperRef}>
      <Navbar />

      <div className="max-w-[1350px] mx-auto px-4 pt-[90px]">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-3"
        >
          <div
            className={`
              flex items-center justify-between
              px-4 py-3 rounded-xl
              border
              ${isFiltering 
                ? "border-red-400 dark:border-red-500" 
                : "border-gray-200 dark:border-gray-700"}
              bg-white dark:bg-[#1a1a1a]
              shadow-sm
              hover:shadow-md transition
            `}
          >
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 translate-y-1">
              Tìm kiếm nâng cao
            </h2>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {filteredFoods.length} kết quả
              </span>

              {isFiltering && (
                <button
                  onClick={() => {
                    setType("all");
                    setPrice("all");
                    setRating("all");
                    setTag("all");
                    setRegion("all");
                  }}
                  className="text-xs text-red-500 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* FILTER */}
        <div className="relative z-50 mb-4">
          <div className="flex flex-wrap gap-3 p-4 rounded-xl">

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

            {/* REGION DROPDOWN */}
            <Dropdown
              id="region"
              value={region}
              setValue={setRegion}
              label="Khu vực"
              options={[
                { value: "all", label: "Tất cả khu vực" },
                { value: "hcm", label: "TP.HCM" },
                { value: "ninhbinh", label: "Ninh Bình" },
                { value: "caobang", label: "Cao Bằng" },
                { value: "hue", label: "Huế" },
                { value: "hanoi", label: "Hà Nội" },
                { value: "danang", label: "Đà Nẵng" },
                { value: "thanhhoa", label: "Thanh Hóa" },
                { value: "others", label: "Khác" },
              ]}
              open={open}
              setOpen={setOpen}
            />

          </div>
        </div>

        {/* LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
          <AnimatePresence>
            {filteredFoods.length > 0 ? (
              filteredFoods.map((item, index) => (
                <motion.div
                  key={item.id ?? index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -5 }}
                >
                  <FoodCard
                    id={item.id}
                    name={item.name}
                    address={item.address}
                    image={item.image}
                    rating={item.rating}
                    comments={item.comments}
                    photos={item.photos}
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-gray-500 dark:text-gray-400">
                😢 Không tìm thấy kết quả
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
}