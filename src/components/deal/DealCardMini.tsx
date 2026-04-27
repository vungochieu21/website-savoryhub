"use client";

import { useState } from "react";
import styles from "./DealSection.module.css";
import { useLanguage } from "src/locales/context/LanguageContext";
import { motion } from "framer-motion";
import { FaFire, FaCopy, FaCheck } from "react-icons/fa";

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
    shop: "deal_shop_1",
    name: "deal_name_1",
    price: 150000,
    oldPrice: 215000,
    image: "https://img.dominos.vn/musttry+(6).jpg",
    code: "PIZZA30",
    desc: "deal_desc_1",
  },
  {
    id: 2,
    shop: "deal_shop_2",
    name: "deal_name_2",
    price: 150000,
    oldPrice: 300000,
    image:
      "https://static.kfcvietnam.com.vn/images/items/lg/D.BUCKET2.jpg?v=4BBbw4",
    code: "KFCGROUP50",
    desc: "deal_desc_2",
  },
  {
    id: 3,
    shop: "deal_shop_3",
    name: "deal_name_3",
    price: 159000,
    oldPrice: 199000,
    image:
      "https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/s/h/sharing_combo_199.jpg",
    code: "LOVEBK20",
    desc: "deal_desc_3",
  },
];

export default function DealSection() {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { t } = useLanguage();

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

            {/* 🔥 LEFT */}
            <motion.span
              className={styles.fireIcon}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <FaFire />
            </motion.span>

            {t("daily_deals")}

            {/* 🔥 RIGHT */}
            <motion.span
              className={styles.fireIcon}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <FaFire />
            </motion.span>

          </h2>

          <p className={styles.subtitle}>
            {t("limited_offer")}
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
                  {t("limited")}
                </span>
              </div>

              {/* CONTENT */}
              <div className={styles.content}>
                
                <p className={styles.shop}>{t(deal.shop)}</p>

                <h3 className={styles.discount}>
                  {Math.round(
                    ((deal.oldPrice - deal.price) / deal.oldPrice) * 100
                  )}% OFF
                </h3>

                <p className={styles.name}>{t(deal.name)}</p>

                <p className={styles.desc}>{t(deal.desc)}</p>

                {/* CODE */}
                <div className={styles.codeBox}>
                  <div>
                    <p className={styles.codeLabel}>
                      {t("promo_code")}
                    </p>

                    <p className={styles.code}>
                      {deal.code}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(deal.code, deal.id)}
                    className={styles.copyBtn}
                  >
                    {copiedId === deal.id ? <FaCheck /> : <FaCopy />}
                  </button>
                </div>

                {/* BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.btn}
                >
                  {t("order_now")}
                </motion.button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}