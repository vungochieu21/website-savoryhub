"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "src/components/dashboard/dashboard.module.css";
import {
  FaArrowLeft,
  FaMoneyBillWave,
  FaShoppingCart,
  FaPizzaSlice,
  FaDollarSign,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

export default function DashboardPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("weekdays");

  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  // Primary Color
  const COLORS = ["#b30000", "#ff4d4f", "#ff7875", "#ffa39e"];

  const topData = [
    { name: "Phở", value: 50000 },
    { name: "Bún Bò Huế", value: 48000 },
    { name: "Hải sản", value: 47000 },
    { name: "Mì cay", value: 46000 },
    { name: "Cơm tấm", value: 45000 },
  ];

  const bottomData = [
    { name: "Mỳ Ý", value: 10000 },
    { name: "Salad", value: 12000 },
    { name: "Sushi", value: 14000 },
    { name: "Bánh mì", value: 15000 },
    { name: "Đồ chay", value: 16000 },
  ];

  const pieData = [
    { name: "Classic", value: 25 },
    { name: "Supreme", value: 25 },
    { name: "Gà", value: 25 },
    { name: "Chay", value: 25 },
  ];

  const lineData = [
    { time: "10h", value: 200 },
    { time: "12h", value: 2200 },
    { time: "14h", value: 2600 },
    { time: "16h", value: 1800 },
    { time: "18h", value: 2400 },
    { time: "20h", value: 2000 },
    { time: "22h", value: 1200 },
  ];

  const heatmap = [
    [2, 195, 234, 242, 233, 227, 301],
    [57, 379, 393, 225, 167, 229, 273],
    [49, 339, 437, 261, 191, 227, 315],
    [47, 387, 442, 268, 181, 241, 319],
  ];

  return (
    <div className={styles.dashboard}>
      {/* HEADER */}
      <div className={styles.header}>
        <button onClick={handleBack} className={styles.backBtn}>
          <FaArrowLeft /> Quay lại
        </button>

        <img src="/Logo.png" alt="logo" width="120"/>

        <div className={styles.filter}>
          <button
            className={filter === "weekdays" ? styles.active : ""}
            onClick={() => setFilter("weekdays")}
          >
            Ngày thường
          </button>
          <button
            className={filter === "weekends" ? styles.active : ""}
            onClick={() => setFilter("weekends")}
          >
            Cuối tuần
          </button>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className={styles.sidebar}>
        <Stat icon={<FaMoneyBillWave />} value="$817,860" label="Doanh thu" />
        <Stat icon={<FaShoppingCart />} value="21,350" label="Đơn hàng" />
        <Stat icon={<FaPizzaSlice />} value="49,574" label="Số lượng" />
        <Stat icon={<FaDollarSign />} value="$38" label="Trung bình" />
      </div>

      {/* MAIN */}
      <div className={styles.main}>
        <div className={styles.chart}>
          <h3>Những mặt  hàng bán chạy</h3>
          <ResponsiveContainer height={220}>
            <BarChart data={topData}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Bar dataKey="value" fill="#b30000" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chart}>
          <h3>Những mặt hàng bán chậm</h3>
          <ResponsiveContainer height={220}>
            <BarChart data={bottomData}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Bar dataKey="value" fill="#ff4d4f" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chart}>
          <h3>Phân loại</h3>
          <ResponsiveContainer height={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value">
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartWide}>
          <h3>Giờ cao điểm</h3>
          <ResponsiveContainer height={260}>
            <LineChart data={lineData}>
              <XAxis dataKey="time" />
              <Tooltip />
              <Line
                dataKey="value"
                stroke="#b30000"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.heatmap}>
          <h3>Bản đồ nhiệt đơn hàng</h3>
          <table>
            <tbody>
              {heatmap.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      style={{
                        background: `rgba(179,0,0,${cell / 500})`,
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, value, label }: any) {
  return (
    <div className={styles.card}>
      {icon}
      <h2>{value}</h2>
      <p>{label}</p>
    </div>
  );
}