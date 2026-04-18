"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import Navbar from "src/components/layout/Navbar";
import Banner from "src/components/layout/Banner";
import DealCardMini from "src/components/deal/DealCardMini";
import ExclusiveDeal from "src/components/deal/ExclusiveDeal";
import BannerMini from "src/components/layout/BannerMini";
import RestaurantList from "src/components/food/RestaurantList";
import Testimonials from "src/components/section/Testimonials";
import Footer from "src/components/layout/Footer";
import NearbyRestaurant from "src/components/food/NearbyRestaurant";

const FoodForm = dynamic(() => import("src/components/food/FoodForm"), {
  ssr: false,
});

const GoogleMap = dynamic(() => import("src/components/section/GoogleMap"), {
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