"use client";

import { useRouter } from "next/navigation";

import styles from "src/components/dashboard/dashboard.module.css";
import StatCard from "src/components/dashboard/StatCard";
import TopFoods from "src/components/dashboard/TopFoods";
import SimpleChart from "src/components/dashboard/SimpleChart";

import {
  FaUsers,
  FaUtensils,
  FaHeart,
  FaArrowLeft,
} from "react-icons/fa";

import { useLanguage } from "src/locales/context/LanguageContext";

export default function DashboardPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const stats = {
    users: 120,
    foods: 340,
    favorites: 980,
  };

  const topFoods = [
    { name: "Phở bò", likes: 120 },
    { name: "Bún chả", likes: 95 },
    { name: "Cơm tấm", likes: 80 },
    { name: "Bánh mì", likes: 70 },
    { name: "Gà rán", likes: 60 },
  ];

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={handleBack}>
            <FaArrowLeft /> {t("back")}
          </button>

          <div>
            <h1>📊 Tastii {t("dashboard")}</h1>
            <p>{t("dashboard_welcome")}</p>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <StatCard
          title={t("users")}
          value={stats.users}
          trend={12}
          data={[10, 15, 12, 18, 20, 22]}
          icon={<FaUsers />}
          color="blue"
        />

        <StatCard
          title={t("foods")}
          value={stats.foods}
          trend={8}
          data={[20, 25, 30, 28, 35, 40]}
          icon={<FaUtensils />}
          color="orange"
        />

        <StatCard
          title={t("favorites")}
          value={stats.favorites}
          trend={-5}
          data={[50, 48, 45, 40, 38, 35]}
          icon={<FaHeart />}
          color="red"
        />
      </div>

      <div className={styles.layout}>
        <div className={styles.chartCard}>
          <h3>📈 {t("analytics")}</h3>
          <SimpleChart />
        </div>

        <div className={styles.topCard}>
          <h3>🔥 {t("top_foods")}</h3>
          <TopFoods data={topFoods} />
        </div>
      </div>
    </div>
  );
}