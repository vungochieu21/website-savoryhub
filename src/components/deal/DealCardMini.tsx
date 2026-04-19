"use client";

import { useState } from "react";
import styles from "./DealSection.module.css";

type Deal = {
  id: number;
  shop: string;
  name: string;
  price: number;
  oldPrice: number;
  image?: string;
  code: string;
  desc: string;
};

const deals: Deal[] = [
  {
    id: 1,
    shop: "Domino's Pizza Nguyễn Tri Phương",
    name: "Pizza Ngập Vị Phô Mai",
    price: 150000,
    oldPrice: 215000,
    image: "https://img.dominos.vn/musttry+(6).jpg",
    code: "PIZZA30",
    desc: "Pizza vị phô mai kéo sợi siêu đã, ăn là ghiền!",
  },
  {
    id: 2,
    shop: "KFC Big C Dĩ An Bình Dương",
    name: "Combo Nhóm 3 Đủ Đầy",
    price: 150000,
    oldPrice: 300000,
    image:
      "https://static.kfcvietnam.com.vn/images/items/lg/D.BUCKET2.jpg?v=4BBbw4",
    code: "KFCGROUP50",
    desc: "Combo gà rán cho nhóm bạn, ăn no căng bụng!",
  },
  {
    id: 3,
    shop: "Burger King Phạm Ngũ Lão",
    name: "Combo cặp đôi",
    price: 159000,
    oldPrice: 199000,
    image:
      "https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/s/h/sharing_combo_199.jpg",
    code: "LOVEBK20",
    desc: "Combo hoàn hảo cho 2 người, vừa ngon vừa tiết kiệm!",
  },
];

export default function DealSection() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        
        {/* HEADER */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            ✨ Deal Ngon Mỗi Ngày ✨
          </h2>

          <p className={styles.subtitle}>
            Ưu đãi có hạn, đừng bỏ lỡ!
          </p>
        </div>

        {/* CARD LIST */}
        <div className={styles.list}>
          {deals.map((deal) => (
            <div key={deal.id} className={styles.card}>
              
              {/* IMAGE */}
              <div className={styles.imageWrap}>
                <img
                  src={deal.image}
                  className={styles.image}
                />

                <span className={styles.badge}>
                  % GIỚI HẠN
                </span>
              </div>

              {/* CONTENT */}
              <div className={styles.content}>
                
                <p className={styles.shop}>{deal.shop}</p>

                <h3 className={styles.discount}>
                  {Math.round(
                    ((deal.oldPrice - deal.price) / deal.oldPrice) * 100
                  )}
                  % OFF
                </h3>

                <p className={styles.name}>{deal.name}</p>

                <p className={styles.desc}>{deal.desc}</p>

                {/* CODE */}
                <div className={styles.codeBox}>
                  <div>
                    <p className={styles.codeLabel}>
                      Mã khuyến mãi
                    </p>

                    <p className={styles.code}>
                      {deal.code}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(deal.code, deal.id)}
                    className={styles.copyBtn}
                  >
                    {copiedId === deal.id ? "Đã copy!" : "Sao chép"}
                  </button>
                </div>

                {/* BUTTON */}
                <button className={styles.btn}>
                  Đặt ngay
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}