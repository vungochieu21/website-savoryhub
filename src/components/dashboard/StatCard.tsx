"use client";

import styles from "./dashboard.module.css";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

type Props = {
  title: string;
  value: number;
  icon?: any;
  trend?: number; // % tăng giảm
  data?: number[]; // sparkline data
  loading?: boolean;
};

export default function StatCard({
  title,
  value,
  icon,
  trend = 0,
  data = [],
  loading = false,
}: Props) {
  const [displayValue, setDisplayValue] = useState(0);

  // 🔢 count up
  useEffect(() => {
    if (loading) return;

    let start = 0;
    const duration = 800;
    const step = Math.ceil(value / (duration / 16));

    const interval = setInterval(() => {
      start += step;
      if (start >= value) {
        start = value;
        clearInterval(interval);
      }
      setDisplayValue(start);
    }, 16);

    return () => clearInterval(interval);
  }, [value, loading]);

  const isUp = trend >= 0;

  return (
    <div className={styles.card}>

      {/* SHIMMER LOADING */}
      {loading && <div className={styles.shimmer}></div>}

      {/* TOP */}
      <div className={styles.top}>
        <span className={styles.title}>{title}</span>

        <div className={styles.iconWrapper}>
          {icon}
        </div>
      </div>

      {/* VALUE */}
      <h2 className={styles.number}>
        {loading ? "..." : displayValue.toLocaleString()}
      </h2>

      {/* TREND */}
      <div className={`${styles.trend} ${isUp ? styles.up : styles.down}`}>
        {isUp ? "▲" : "▼"} {Math.abs(trend)}%
      </div>

      {/* SPARKLINE */}
      {!loading && data.length > 0 && (
        <div className={styles.sparkline}>
          <ResponsiveContainer width="100%" height={50}>
            <LineChart data={data.map((v) => ({ value: v }))}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={isUp ? "#00cc88" : "#ff4d4d"}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* GLOW */}
      <div className={styles.glow}></div>

    </div>
  );
}