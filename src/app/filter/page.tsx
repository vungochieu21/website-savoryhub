"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMoreVertical, FiEdit3, FiTrash2, FiAlertCircle } from "react-icons/fi";

import Navbar from "src/components/layout/Navbar";
import Footer from "src/components/layout/Footer";
import FoodCard from "src/components/food/FoodCard";
import foodsData from "src/data/food.json";
import Dropdown from "src/components/ui/Dropdown";
import FoodForm from "src/components/food/FoodForm";
import { useLanguage } from "src/locales/context/LanguageContext";
import { getCustomFoods } from "src/utils/Storage";

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
  isLocal?: boolean;
  rawData?: any;
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

  const { t } = useLanguage();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [foods, setFoods] = useState<Food[]>([]);

  // Quản lý trạng thái menu ba chấm và xác nhận xóa
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [showConfirmDeleteId, setShowConfirmDeleteId] = useState<number | null>(null);
  
  const [editingFood, setEditingFood] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const loadFoodsData = () => {
    const jsonFoods = Array.isArray(foodsData) ? (foodsData as Food[]).map(f => ({ ...f, isLocal: false })) : [];
    const localRaw = getCustomFoods();

    const localFoods: Food[] = localRaw.map((item: any) => {
      let detectedType = "food";
      const nameLower = (item.name || "").toLowerCase();
      if (nameLower.includes("uống") || nameLower.includes("trà") || nameLower.includes("cà phê") || nameLower.includes("coffee")) {
        detectedType = "drink";
      } else if (nameLower.includes("buffet") || nameLower.includes("nướng")) {
        detectedType = "buffet";
      } else if (nameLower.includes("nhanh") || nameLower.includes("fast")) {
        detectedType = "fastfood";
      }

      return {
        id: item.id,
        name: item.name || "",
        type: detectedType, 
        price: Number(item.minPrice) || 0, 
        rating: 5, 
        address: item.address || "",
        image: item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
        region: item.province === "vietnam" ? "hcm" : (item.province || "others"),
        comments: 0,
        photos: 1,
        tags: [],
        isLocal: true,
        rawData: item
      };
    });

    setFoods([...jsonFoods, ...localFoods]);
  };

  useEffect(() => {
    loadFoodsData();
    window.addEventListener("storage_updated", loadFoodsData);
    return () => {
      window.removeEventListener("storage_updated", loadFoodsData);
    };
  }, []);

  /* CLICK OUTSIDE */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(null);
        setActiveMenuId(null);
        setShowConfirmDeleteId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* XÓA MÓN ĂN */
  const handleDelete = (id: number) => {
    const localRaw = getCustomFoods();
    const updatedList = localRaw.filter((item: any) => item.id !== id);
    localStorage.setItem("custom_foods", JSON.stringify(updatedList));
    setActiveMenuId(null);
    setShowConfirmDeleteId(null);
    loadFoodsData();
  };

  /* LƯU KHI SỬA XONG */
  const handleSaveEdit = (updatedForm: any) => {
    const localRaw = getCustomFoods();
    const updatedList = localRaw.map((item: any) => {
      if (item.id === editingFood.id) {
        return { ...item, ...updatedForm }; 
      }
      return item;
    });
    localStorage.setItem("custom_foods", JSON.stringify(updatedList));
    setIsEditModalOpen(false);
    setEditingFood(null);
    loadFoodsData();
  };

  /* FILTER */
  const filteredFoods = useMemo(() => {
    return foods.filter((item) => {
      if (type !== "all" && item.type !== type) return false;

      if (price !== "all") {
        if (price === "low" && item.price > PRICE_RANGE.LOW) return false;
        if (price === "mid" && (item.price < PRICE_RANGE.LOW || item.price > PRICE_RANGE.HIGH)) return false;
        if (price === "high" && item.price < PRICE_RANGE.HIGH) return false;
      }

      if (rating !== "all") {
        if (rating === "1-2" && !(item.rating >= 1 && item.rating < 2)) return false;
        if (rating === "2-3" && !(item.rating >= 2 && item.rating < 3)) return false;
        if (rating === "3-4" && !(item.rating >= 3 && item.rating < 4)) return false;
        if (rating === "4-5" && !(item.rating >= 4 && item.rating < 5)) return false;
        if (rating === "5" && item.rating < 5) return false;
      }

      if (tag !== "all" && !(item.tags || []).includes(tag)) return false;
      if (region !== "all" && item.region !== region) return false;

      return true;
    });
  }, [foods, type, price, rating, tag, region]);

  const isFiltering =
    type !== "all" || price !== "all" || rating !== "all" || tag !== "all" || region !== "all";

  return (
    <div ref={wrapperRef}>
      <Navbar onAdd={() => {}} />

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
              ${isFiltering ? "border-red-400 dark:border-red-500" : "border-gray-200 dark:border-gray-700"}
              bg-white dark:bg-[#1a1a1a]
              shadow-sm
              hover:shadow-md transition
            `}
          >
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 translate-y-1">
              {t("filter_title")}
            </h2> 

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {filteredFoods.length} {t("results")}
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
                  {t("reset")}
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* FILTER BAR */}
        <div className="relative z-50 mb-4">
          <div className="flex flex-wrap gap-3 p-4 rounded-xl">
            <Dropdown
              id="type"
              value={type}
              setValue={setType}
              label={t("type")}
              options={[
                { value: "all", label: t("all") },
                { value: "food", label: t("restaurant") },
                { value: "drink", label: t("drink") },
                { value: "fastfood", label: t("fastfood") },
                { value: "buffet", label: t("buffet") },
              ]}
              open={open}
              setOpen={setOpen}
            />

            <Dropdown
              id="price"
              value={price}
              setValue={setPrice}
              label={t("price")}
              options={[
                { value: "all", label: t("price_all") },
                { value: "low", label: t("under_50k") },
                { value: "mid", label: t("50_150k") },
                { value: "high", label: t("over_150k") },
              ]}
              open={open}
              setOpen={setOpen}
            />

            <Dropdown
              id="rating"
              value={rating}
              setValue={setRating}
              label={t("rating")}
              options={[
                { value: "all", label: t("rating_all") },
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
              label={t("taste")}
              options={[
                { value: "all", label: t("taste_all") },
                { value: "chay", label: t("vegetarian") },
                { value: "cay", label: t("spicy") },
                { value: "mặn", label: t("salty") },
                { value: "ngọt", label: t("sweet") },
              ]}
              open={open}
              setOpen={setOpen}
            />

            <Dropdown
              id="region"
              value={region}
              setValue={setRegion}
              label={t("region")}
              options={[
                { value: "all", label: t("all_region") },
                { value: "hcm", label: "TP.HCM" },
                { value: "ninhbinh", label: "Ninh Bình" },
                { value: "caobang", label: "Cao Bằng" },
                { value: "hue", label: "Huế" },
                { value: "hanoi", label: "Hà Nội" },
                { value: "danang", label: "Đà Nẵng" },
                { value: "thanhhoa", label: "Thanh Hóa" },
                { value: "others", label: t("other") },
              ]}
              open={open}
              setOpen={setOpen}
            />
          </div>
        </div>

        {/* LIST CARDS */}
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
                  className="relative group"
                >
                  
                  {/* BA CHẤM & MENU GIAO DIỆN TỐI (TỰ CUSTOM KHÔNG DÙNG ANT DESIGN) */}
                  {item.isLocal && (
                    <div className="absolute top-3 right-3 z-30">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === item.id ? null : (item.id as number));
                          setShowConfirmDeleteId(null); // Reset lại confirm nếu mở lại menu
                        }}
                        className="w-8 h-8 rounded-xl bg-[#2a2a2a] bg-opacity-85 text-white flex items-center justify-center shadow-md hover:bg-[#3a3a3a] transition-all"
                      >
                        <FiMoreVertical size={18} />
                      </button>

                      <AnimatePresence>
                        {/* 1. MENU CHÍNH */}
                        {activeMenuId === item.id && showConfirmDeleteId !== item.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -5 }}
                            transition={{ duration: 0.12 }}
                            className="absolute right-0 mt-2 w-40 bg-[#2b2b2b] text-white rounded-2xl shadow-xl p-1.5 flex flex-col gap-0.5 border border-neutral-700"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => {
                                setEditingFood(item.rawData);
                                setIsEditModalOpen(true);
                                setActiveMenuId(null);
                              }}
                              className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-neutral-700 transition w-full text-left font-medium"
                            >
                              <FiEdit3 size={16} />
                              <span>{t("edit") || "Chỉnh sửa"}</span>
                            </button>

                            <button
                              onClick={() => {
                                setShowConfirmDeleteId(item.id as number); // Bật menu xác nhận xóa ngay tại vị trí này
                              }}
                              className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-neutral-700 text-white transition w-full text-left font-medium"
                            >
                              <FiTrash2 size={16} />
                              <span>{t("delete") || "Xóa bỏ"}</span>
                            </button>
                          </motion.div>
                        )}

                        {/* 2. MENU XÁC NHẬN XÓA MINI (THAY THẾ POPCONFIRM CỦA ANT DESIGN) */}
                        {showConfirmDeleteId === item.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -5 }}
                            transition={{ duration: 0.12 }}
                            className="absolute right-0 mt-2 w-48 bg-[#222222] text-white rounded-2xl shadow-2xl p-3 border border-neutral-700 flex flex-col gap-2.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-start gap-2 text-neutral-300">
                              <FiAlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                              <span className="text-xs leading-tight font-medium">Bạn chắc chắn muốn xóa quán này?</span>
                            </div>
                            
                            <div className="flex items-center gap-2 justify-end">
                              <button
                                onClick={() => setShowConfirmDeleteId(null)}
                                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-neutral-700 hover:bg-neutral-600 transition"
                              >
                                {t("no") || "Không"}
                              </button>
                              <button
                                onClick={() => handleDelete(item.id as number)}
                                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-red-500 hover:bg-red-600 transition text-white shadow-sm"
                              >
                                {t("yes") || "Có, Xóa"}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  <FoodCard
                    id={String(item.id ?? "")}
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
                {t("no_result")}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />

      {/* POPUP MODAL ĐỂ SỬA */}
      {isEditModalOpen && editingFood && (
        <FoodForm
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingFood(null);
          }}
          onSave={handleSaveEdit}
          initialData={editingFood}
        />
      )}
    </div>
  );
}