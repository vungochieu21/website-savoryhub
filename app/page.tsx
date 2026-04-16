"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import DealCardMini from "@/components/DealCardMini";
import ExclusiveDeal from "@/components/ExclusiveDeal";
import BannerMini from "@/components/BannerMini";
import RestaurantList from "@/components/RestaurantList";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import FoodForm from "@/components/FoodForm";
import NearbyRestaurant from "@/components/NearbyRestaurant";
import GoogleMap from "@/components/GoogleMap";

export default function Home() {
  const [foods, setFoods] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/data/foods.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA JSON:", data);
        setFoods(data);
      })
      .catch((err) => console.log(err));
  }, []);

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
        <GoogleMap />
      </div>
      <Footer />
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
            editingIndex !== null
              ? foods[editingIndex]
              : null
          }
        />
      )}
    </>
  );
}