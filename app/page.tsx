"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import DealCardMini from "@/components/DealCardMini";
import ExclusiveDeal from "@/components/ExclusiveDeal";
import BannerMini from "@/components/BannerMini";
import RestaurantList from "@/components/RestaurantList";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import NearbyRestaurant from "@/components/NearbyRestaurant";

/* 🔥 FIX SSR COMPONENT */
const FoodForm = dynamic(() => import("@/components/FoodForm"), {
  ssr: false,
});

const GoogleMap = dynamic(() => import("@/components/GoogleMap"), {
  ssr: false,
});

export default function Home() {
  const [mounted, setMounted] = useState(false);

  const [foods, setFoods] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);

    fetch("/data/foods.json")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 🔥 CHẶN HYDRATION
  if (!mounted) return null;

  return (
    <>
      <Navbar onAdd={() => setShowForm(true)} />

      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "20px 1px",
        }}
      >
        <Banner />
        <DealCardMini />
        <ExclusiveDeal />
        <BannerMini />

        <RestaurantList
          foods={foods}
          onEdit={(i) => {
            setEditingIndex(i);
            setShowForm(true);
          }}
          onDelete={(i) => {
            const newFoods = [...foods];
            newFoods.splice(i, 1);
            setFoods(newFoods);
          }}
        />

        <Testimonials />
        <NearbyRestaurant />

        {/* MAP */}
        <GoogleMap />
      </div>

      <Footer />

      {/* FORM */}
      {showForm && (
        <FoodForm
          onClose={() => {
            setShowForm(false);
            setEditingIndex(null);
          }}
          onSave={(data) => {
            if (editingIndex !== null) {
              const newFoods = [...foods];
              newFoods[editingIndex] = data;
              setFoods(newFoods);
            } else {
              setFoods([...foods, data]);
            }

            setShowForm(false);
            setEditingIndex(null);
          }}
          initialData={
            editingIndex !== null ? foods[editingIndex] : null
          }
        />
      )}
    </>
  );
}