"use client";

import {
  LineChart, Line, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import styles from "./dashboard.module.css";

type DataType = {
  date: string;
  users: number;
  foods: number;
  likes: number;
};

export default function SimpleChart() {
  const [data, setData] = useState<DataType[]>([]);
  const [range, setRange] = useState<7 | 30>(7);

  // 🔹 generate data
  const generateData = (days: number): DataType[] => {
    return Array.from({ length: days }).map((_, i) => ({
      date: format(new Date(Date.now() - (days - i) * 86400000), "dd/MM"),
      users: Math.floor(Math.random() * 50) + 50,
      foods: Math.floor(Math.random() * 40) + 30,
      likes: Math.floor(Math.random() * 100) + 80,
    }));
  };

  // load data
  useEffect(() => {
    setData(generateData(range));
  }, [range]);

  // 🔥 realtime update
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((item) => ({
          ...item,
          users: item.users + Math.floor(Math.random() * 10 - 5),
          foods: item.foods + Math.floor(Math.random() * 10 - 5),
          likes: item.likes + Math.floor(Math.random() * 15 - 7),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.box}>

      {/* HEADER */}
      <div className={styles.chartHeader}>
        <h3>📊 Thống kê hệ thống</h3>

        <div className={styles.filter}>
          <button
            className={range === 7 ? styles.active : ""}
            onClick={() => setRange(7)}
          >
            7 ngày
          </button>
          <button
            className={range === 30 ? styles.active : ""}
            onClick={() => setRange(30)}
          >
            30 ngày
          </button>
        </div>
      </div>

      {/* CHART */}
      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <defs>
              <linearGradient id="likesColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff4d4d" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#ff4d4d" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#333" strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#aaa" />
            <YAxis stroke="#aaa" />

            <Tooltip
              contentStyle={{
                background: "#111",
                border: "1px solid #333",
                borderRadius: "10px",
              }}
            />

            <Legend />

            {/* 🔴 Likes (Area) */}
            <Area
              type="monotone"
              dataKey="likes"
              stroke="#ff4d4d"
              fill="url(#likesColor)"
              strokeWidth={2}
              animationDuration={800}
            />

            {/* 🔵 Users */}
            <Line
              type="monotone"
              dataKey="users"
              stroke="#4da6ff"
              strokeWidth={2}
              dot={false}
            />

            {/* 🟢 Foods */}
            <Line
              type="monotone"
              dataKey="foods"
              stroke="#00cc88"
              strokeWidth={2}
              dot={false}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}