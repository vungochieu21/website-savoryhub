"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import DealCardMini from "@/components/DealCardMini";
import BannerMini from "@/components/BannerMini";
import RestaurantList from "@/components/RestaurantList";
import Footer from "@/components/Footer";
import FoodForm from "@/components/FoodForm";

export default function Home() {
  const [foods, setFoods] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <>
      {/* NAVBAR */}
      <Navbar onAdd={() => setShowForm(true)} />

      {/* CONTENT CHỪA 2 BÊN */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px 16px",
        }}
      >
        <Banner />
        <DealCardMini />
        <BannerMini />

        {/* LIST QUÁN */}
        <RestaurantList
          foods={foods}
          onEdit={(i: number) => {
            setEditingIndex(i);
            setShowForm(true);
          }}
          onDelete={(i: number) => {
            const newList = [...foods];
            newList.splice(i, 1);
            setFoods(newList);
          }}
        />
      </div>

      <Footer />

      {/* FORM THÊM / SỬA */}
      {showForm && (
        <FoodForm
          onClose={() => {
            setShowForm(false);
            setEditingIndex(null);
          }}
          onSave={(data: any) => {
            if (editingIndex !== null) {
              const newList = [...foods];
              newList[editingIndex] = data;
              setFoods(newList);
            } else {
              setFoods([...foods, data]);
            }

            setShowForm(false);
            setEditingIndex(null);
          }}
          initialData={editingIndex !== null ? foods[editingIndex] : null}
        />
      )}
    </>
  );
}