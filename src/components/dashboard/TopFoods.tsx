"use client";

import styles from "./dashboard.module.css";

type Food = {
  name: string;
  likes: number;
};

export default function TopFoods({ data }: { data: Food[] }) {

  const maxLikes = Math.max(...data.map(d => d.likes), 1);

  return (
    <div className={styles.box}>
      <h3 className={styles.title}>🔥 Top món ăn</h3>

      {data.map((item, i) => {
        const percent = (item.likes / maxLikes) * 100;

        return (
          <div key={i} className={styles.row}>

            {/* LEFT */}
            <div className={styles.left}>
              <span className={`${styles.rank} ${i === 0 ? styles.top1 : ""}`}>
                {i === 0 ? "👑" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
              </span>

              <div className={styles.foodInfo}>
                <span className={styles.name}>{item.name}</span>

                {/* PROGRESS BAR */}
                <div className={styles.progress}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className={styles.likes}>
              ❤️ {item.likes}
            </div>

          </div>
        );
      })}
    </div>
  );
}