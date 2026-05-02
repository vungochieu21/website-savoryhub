"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaMoneyBillWave,
  FaShoppingCart,
  FaPizzaSlice,
  FaDollarSign,
} from "react-icons/fa";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid
} from "recharts";

import { useLanguage } from "src/locales/context/LanguageContext";
import styles from "./Dashboard.module.css";

export default function DashboardPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [filter, setFilter] = useState("weekdays");

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const [stats, setStats] = useState({ revenue: 0, orders: 0, quantity: 0, average: 0 });
  const [dynamicLineData, setDynamicLineData] = useState([
    { time: "10h", value: 200 }, { time: "12h", value: 2200 }, { time: "14h", value: 2600 },
    { time: "16h", value: 1800 }, { time: "18h", value: 2400 }, { time: "20h", value: 2000 }, { time: "22h", value: 1200 }
  ]);
  const [heatmapData, setHeatmapData] = useState<number[]>([]);

  useEffect(() => {
    const isWeekend = filter === "weekends";
    setStats({
      revenue: isWeekend ? 1250000 : 817860,
      orders: isWeekend ? 35000 : 21350,
      quantity: isWeekend ? 75000 : 49574,
      average: isWeekend ? 45.5 : 38.5
    });
    const baseVal = isWeekend ? 300 : 150;
    setHeatmapData(Array.from({ length: 28 }, () => Math.floor(baseVal + Math.random() * 200)));
  }, [filter]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        revenue: prev.revenue + Math.floor(Math.random() * 200),
        orders: prev.orders + (Math.random() > 0.8 ? 1 : 0),
      }));
      setDynamicLineData(prev => prev.map(item => ({
        ...item,
        value: Math.max(100, item.value + (Math.floor(Math.random() * 401) - 200))
      })));
      setHeatmapData(prev => prev.map(val => Math.max(10, val + (Math.floor(Math.random() * 41) - 20)) ));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  const topData = useMemo(() => {
    const base = [
      { name: t("pho"), value: filter === "weekends" ? 70000 : 50000 },
      { name: t("bun_bo"), value: filter === "weekends" ? 65000 : 48000 },
      { name: t("seafood"), value: filter === "weekends" ? 82000 : 47000 },
      { name: t("spicy_noodles"), value: filter === "weekends" ? 55000 : 46000 },
      { name: t("broken_rice"), value: filter === "weekends" ? 50000 : 45000 }
    ];
    return base.sort((a, b) => b.value - a.value);
  }, [filter, t]);

  const chartText = isDark ? "#888888" : "#666666";
  const chartGrid = isDark ? "#222222" : "#eeeeee";
  const tooltipBg = isDark ? "#111111" : "#ffffff";

  return (
    <div className={styles.page}>
      
      {/* NAVBAR */}
      <div className={styles.navbar}>
        <button onClick={handleBack} className={styles.backBtn}>
          <FaArrowLeft size={14} /> {t("back")}
        </button>

        <div className={styles.filterContainer}>
          {["weekdays", "weekends"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{ 
                border: "none", padding: "8px 22px", borderRadius: "8px", cursor: "pointer",
                backgroundColor: filter === type ? "var(--primary-red)" : "transparent",
                color: filter === type ? "#fff" : "var(--text-sub)", 
                fontWeight: "normal", fontSize: "0.9rem", transition: "0.3s"
              }}
            >
              {type === "weekdays" ? t("weekdays") : t("weekends")}
            </button>
          ))}
        </div>
      </div>

      {/* KPI SECTION */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        <StatCard icon={<FaMoneyBillWave />} value={`$${stats.revenue.toLocaleString()}`} label={t("revenue")} color="#4caf50" />
        <StatCard icon={<FaShoppingCart />} value={stats.orders.toLocaleString()} label={t("orders")} color="#2196f3" />
        <StatCard icon={<FaPizzaSlice />} value={stats.quantity.toLocaleString()} label={t("quantity")} color="#ff9800" />
        <StatCard icon={<FaDollarSign />} value={`$${stats.average}`} label={t("average")} color="#9c27b0" />
      </div>

      {/* CHARTS GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "24px" }}>
        
        {/* PEAK HOURS */}
        <div className={styles.chartCard} style={{ gridColumn: "span 8" }}>
          <h3 style={{ marginBottom: "18px", color: "var(--text-sub)", fontSize: "1rem", fontWeight: "normal" }}>{t("peak_hours_live")}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dynamicLineData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} vertical={false} />
              <XAxis dataKey="time" stroke={chartText} tick={{fontSize: 11}} />
              <YAxis stroke={chartText} tick={{fontSize: 11}} domain={[0, 4500]} />
              <Tooltip contentStyle={{ backgroundColor: tooltipBg, border: `1px solid var(--border-color)`, color: "var(--text-main)" }} />
              <Line type="monotone" dataKey="value" stroke="var(--primary-red)" strokeWidth={3} dot={{ r: 4, fill: "var(--primary-red)" }} animationDuration={1000} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* CATEGORY */}
        <div className={styles.chartCard} style={{ gridColumn: "span 4" }}>
          <h3 style={{ marginBottom: "18px", color: "var(--text-sub)", fontSize: "1rem", fontWeight: "normal" }}>{t("category_breakdown")}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={[{name: t('takeaway'), value: 400}, {name: t('dine_in'), value: 300}]} dataKey="value" innerRadius={65} outerRadius={90}>
                <Cell fill="var(--primary-red)" />
                <Cell fill={isDark ? "#333" : "#ddd"} />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BEST SELLING */}
        <div className={styles.chartCard} style={{ gridColumn: "span 6" }}>
          <h3 style={{ marginBottom: "18px", color: "var(--text-sub)", fontSize: "1rem", fontWeight: "normal" }}>{t("best_selling")} ({filter === "weekdays" ? t("weekdays") : t("weekends")})</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" stroke={chartText} width={90} tick={{fontSize: 11}} />
              <Bar dataKey="value" fill="var(--primary-red)" radius={[0, 5, 5, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* HEATMAP */}
        <div className={styles.chartCard} style={{ gridColumn: "span 6" }}>
          <h3 style={{ marginBottom: "18px", color: "var(--text-sub)", fontSize: "1rem", fontWeight: "normal" }}>{t("order_density_live")}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
            {heatmapData.map((cell, idx) => (
              <div
                key={idx}
                className={styles.heatmapCell}
                style={{
                  backgroundColor: `rgba(179, 0, 0, ${cell / 500})`, 
                  color: cell > 280 ? "#fff" : "var(--text-sub)",
                }}
              >
                {cell}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ icon, value, label, color }: any) {
  return (
    <div className={styles.statCard}>
      <div style={{ 
        fontSize: "20px", color: color, background: `${color}15`, 
        width: "48px", height: "48px", borderRadius: "12px", 
        display: "flex", alignItems: "center", justifyContent: "center" 
      }}>
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, color: "var(--text-sub)", fontSize: "13px" }}>{label}</p>
        <h2 style={{ margin: "4px 0 0 0", color: "var(--text-main)", fontSize: "22px", fontWeight: "bold", transition: "all 0.4s" }}>{value}</h2>
      </div>
    </div>
  );
}