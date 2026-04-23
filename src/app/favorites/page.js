"use client";

import { useFavorites } from "src/locales/context/FavoriteContext";
import FoodCard from "src/components/food/FoodCard";
import { useRouter } from "next/navigation";
import { useLanguage } from "src/locales/context/LanguageContext";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      
      {/* 🔙 quay lại */}
      <button
        onClick={() => router.push("/")}
        style={{
          marginBottom: "20px",
          padding: "8px 0px",
          cursor: "pointer",
        }}
      >
        ← {t("back")}
      </button>

      <h1>{t("favorites_title")}</h1>

      {/* ❌ không có */}
      {favorites.length === 0 ? (
        <div
          style={{
            height: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "16px",
          }}
        >
          <img
            src="/empty-favorite.png" 
            alt="No favorites"
            style={{
              width: "200px",
              opacity: 0.8,
            }}
          />

          <p style={{ fontSize: "16px", opacity: 0.8 }}>
            {t("empty_favorite_full")}
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {favorites.map((item) => (
            <FoodCard
              key={item.id}
              id={item.id}
              name={item.name}
              address={item.address}
              image={item.image}
              rating={item.rating}
              comments={item.comments}
              photos={item.photos}
            />
          ))}
        </div>
      )}
    </div>
  );
}