"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import foodsData from "@/data/food.json";

export default function FilterPage() {
  const [type, setType] = useState("all");

  const foods = Array.isArray(foodsData) ? foodsData : [];

  const filteredFoods = foods.filter((item: any) => {
    if (type === "all") return true;
    return item.type ? item.type === type : false;
  });

  return (
    <div>
      <Navbar />

      {/* WRAPPER */}
      <div
        style={{
          maxWidth: "1350px",
          margin: "0 auto",
          padding: "20px 1px",
        }}
      >
        {/* FILTER BAR */}
        <div className="flex gap-3 p-4 mt-[100px] justify-center">
          <button onClick={() => setType("all")}>Tất cả</button>
          <button onClick={() => setType("food")}>Quán ăn</button>
          <button onClick={() => setType("drink")}>Đồ uống</button>
        </div>

        {/* FOOD GRID */}
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