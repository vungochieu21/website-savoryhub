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

export default function DashboardPage() {
  const router = useRouter();

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
            <FaArrowLeft /> Back
          </button>

          <div>
            <h1>📊 Tastii Dashboard</h1>
            <p>Welcome back 👋 Here's what's happening today</p>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <StatCard
          title="Users"
          value={stats.users}
          trend={12}
          data={[10, 15, 12, 18, 20, 22]}
          icon={<FaUsers />}
          color="blue"
        />

        <StatCard
          title="Foods"
          value={stats.foods}
          trend={8}
          data={[20, 25, 30, 28, 35, 40]}
          icon={<FaUtensils />}
          color="orange"
        />

        <StatCard
          title="Favorites"
          value={stats.favorites}
          trend={-5}
          data={[50, 48, 45, 40, 38, 35]}
          icon={<FaHeart />}
          color="red"
        />
      </div>

      <div className={styles.layout}>
        <div className={styles.chartCard}>
          <h3>📈 Analytics</h3>
          <SimpleChart />
        </div>

        <div className={styles.topCard}>
          <h3>🔥 Top Foods</h3>
          <TopFoods data={topFoods} />
        </div>
      </div>
    </div>
  );
}