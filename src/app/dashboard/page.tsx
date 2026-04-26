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
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from "recharts";

import { useLanguage } from "src/locales/context/LanguageContext";

const theme = {
  bg: "#080808",
  cardBg: "#121212",
  navBg: "#181818",
  textMain: "#ffffff",
  textSub: "#888888",
  border: "#282828",
  primaryRed: "#b30000",
};

export default function DashboardPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [filter, setFilter] = useState("weekdays");

  // --- SỐ LIỆU KPI ---
  const [stats, setStats] = useState({ revenue: 0, orders: 0, quantity: 0, average: 0 });

  // --- DỮ LIỆU PEAK HOURS (LIVE) ---
  const [dynamicLineData, setDynamicLineData] = useState([
    { time: "10h", value: 200 }, { time: "12h", value: 2200 }, { time: "14h", value: 2600 },
    { time: "16h", value: 1800 }, { time: "18h", value: 2400 }, { time: "20h", value: 2000 }, { time: "22h", value: 1200 }
  ]);

  // --- DỮ LIỆU HEATMAP (LIVE) ---
  const [heatmapData, setHeatmapData] = useState<number[]>([]);

  // Khởi tạo dữ liệu ban đầu dựa trên Filter
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

  // Hiệu ứng nhảy số liệu tổng thể
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

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.textMain, minHeight: "100vh", padding: "24px", fontFamily: "sans-serif" }}>
      
      {/* NAVBAR */}
      <div style={{ 
        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px",
        padding: "12px 20px", backgroundColor: theme.navBg, borderRadius: "12px", border: `1px solid ${theme.border}`
      }}>
        <button 
          onClick={handleBack} 
          style={{ 
            border: `1.5px solid ${theme.primaryRed}`, background: "transparent", color: theme.primaryRed,
            padding: "8px 18px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", 
            gap: "10px", fontSize: "0.95rem", transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = theme.primaryRed; e.currentTarget.style.color = "#fff"; }}
          onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = theme.primaryRed; }}
        >
          <FaArrowLeft size={14} /> {t("back")}
        </button>

        <div style={{ display: "flex", background: "#000", borderRadius: "10px", padding: "4px" }}>
          {["weekdays", "weekends"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{ 
                border: "none", padding: "8px 22px", borderRadius: "8px", cursor: "pointer",
                backgroundColor: filter === type ? theme.primaryRed : "transparent",
                color: "#fff", fontWeight: "normal", fontSize: "0.9rem", transition: "0.3s"
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
        <div style={{ gridColumn: "span 8", background: theme.cardBg, padding: "24px", borderRadius: "16px", border: `1px solid ${theme.border}` }}>
          <h3 style={{ marginBottom: "18px", color: theme.textSub, fontSize: "1rem", fontWeight: "normal" }}>{t("peak_hours_live")}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dynamicLineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
              <XAxis dataKey="time" stroke={theme.textSub} tick={{fontSize: 11}} />
              <YAxis stroke={theme.textSub} tick={{fontSize: 11}} domain={[0, 4500]} />
              <Tooltip contentStyle={{ backgroundColor: "#111", border: `1px solid ${theme.border}`, color: "#fff" }} />
              <Line type="monotone" dataKey="value" stroke={theme.primaryRed} strokeWidth={3} dot={{ r: 4, fill: theme.primaryRed }} animationDuration={1000} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* CATEGORY */}
        <div style={{ gridColumn: "span 4", background: theme.cardBg, padding: "24px", borderRadius: "16px", border: `1px solid ${theme.border}` }}>
          <h3 style={{ marginBottom: "18px", color: theme.textSub, fontSize: "1rem", fontWeight: "normal" }}>{t("category_breakdown")}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={[{name: t('takeaway'), value: 400}, {name: t('dine_in'), value: 300}]} dataKey="value" innerRadius={65} outerRadius={90}>
                <Cell fill={theme.primaryRed} />
                <Cell fill="#333" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BEST SELLING */}
        <div style={{ gridColumn: "span 6", background: theme.cardBg, padding: "24px", borderRadius: "16px", border: `1px solid ${theme.border}` }}>
          <h3 style={{ marginBottom: "18px", color: theme.textSub, fontSize: "1rem", fontWeight: "normal" }}>{t("best_selling")} ({filter === "weekdays" ? t("weekdays") : t("weekends")})</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" stroke={theme.textSub} width={90} tick={{fontSize: 11}} />
              <Bar dataKey="value" fill={theme.primaryRed} radius={[0, 5, 5, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* HEATMAP */}
        <div style={{ gridColumn: "span 6", background: theme.cardBg, padding: "24px", borderRadius: "16px", border: `1px solid ${theme.border}` }}>
          <h3 style={{ marginBottom: "18px", color: theme.textSub, fontSize: "1rem", fontWeight: "normal" }}>{t("order_density_live")}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
            {heatmapData.map((cell, idx) => (
              <div
                key={idx}
                style={{
                  height: "38px", 
                  backgroundColor: `rgba(179, 0, 0, ${cell / 500})`, 
                  borderRadius: "4px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  fontSize: "10px", 
                  fontWeight: "bold",
                  color: cell > 280 ? "#fff" : "#666",
                  border: "1px solid #1a1a1a",
                  transition: "background-color 0.5s ease"
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
  const { t } = useLanguage();
  return (
    <div style={{ 
      background: theme.cardBg, padding: "22px", borderRadius: "16px", 
      display: "flex", alignItems: "center", gap: "16px", border: `1px solid ${theme.border}`
    }}>
      <div style={{ 
        fontSize: "20px", color: color, background: `${color}10`, 
        width: "48px", height: "48px", borderRadius: "12px", 
        display: "flex", alignItems: "center", justifyContent: "center" 
      }}>
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, color: theme.textSub, fontSize: "13px" }}>{label}</p>
        <h2 style={{ margin: "4px 0 0 0", color: "#fff", fontSize: "22px", fontWeight: "bold", transition: "all 0.4s" }}>{value}</h2>
      </div>
    </div>
  );
}