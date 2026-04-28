"use client";

import { useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaStar, FaCrown, FaGem } from "react-icons/fa";
import styles from "./ExclusiveDeal.module.css";
import { useLanguage } from "src/locales/context/LanguageContext";

export default function ExclusiveDeal() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const { t } = useLanguage();

  const pricingPlans = [
    {
      title: t("plan_starter_title"),
      price: t("plan_starter_price"),
      points: t("plan_starter_points"),
      icon: <FaStar />,
      features: [
        t("feature_discount_5"),
        t("feature_birthday"),
        t("feature_offers"),
        t("feature_support_basic"),
        t("feature_points_every"),
      ],
      colorClass: styles.starter,
    },
    {
      title: t("plan_golden_title"),
      price: t("plan_golden_price"),
      points: t("plan_golden_points"),
      icon: <FaCrown />,
      features: [
        t("feature_discount_10"),
        t("feature_sides"),
        t("feature_support_priority"),
        t("feature_early_access"),
        t("feature_points_weekend"),
        t("feature_delivery_free_limit"),
      ],
      colorClass: styles.golden,
      isPopular: true,
    },
    {
      title: t("plan_platinum_title"),
      price: t("plan_platinum_price"),
      points: t("plan_platinum_points"),
      icon: <FaGem />,
      features: [
        t("feature_discount_15"),
        t("feature_delivery_free"),
        t("feature_vip_events"),
        t("feature_concierge"),
        t("feature_points_3x"),
        t("feature_surprise_box"),
        t("feature_skip_line"),
        t("feature_chef_collab"),
      ],
      colorClass: styles.platinum,
    },
  ];

  const handleSubscribe = () => {
    if (email.endsWith("@gmail.com")) {
      setMessage(t("subscribe_success"));
      setSuccess(true);
      setEmail("");
    } else {
      setMessage(t("invalid_email"));
      setSuccess(false);
    }

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className={styles.wrapper}>
      {/* TOAST */}
      {message && (
        <div className={styles.toast} style={{ background: success ? "#22c55e" : "#ef4444" }}>
          {success ? <FaCheckCircle /> : <FaExclamationCircle />}
          {message}
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{t("exclusive_title")}</h2>
          <p className={styles.desc}>{t("exclusive_desc")}</p>

          {/* PRICING CARDS */}
          <div className={styles.pricingGrid}>
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`${styles.card} ${plan.colorClass}`}>
                {plan.isPopular && <div className={styles.popularBadge}>{t("most_popular")}</div>}
                <div className={styles.cardIcon}>{plan.icon}</div>
                <h3 className={styles.cardTitle}>{plan.title}</h3>
                <div className={styles.cardPrice}>{plan.price}</div>
                <div className={styles.cardPoints}>{plan.points}</div>
                
                <ul className={styles.featureList}>
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <FaCheckCircle className={styles.checkIcon} /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* FORM - CHỈ CẦN ĐIỀN EMAIL ĐĂNG KÝ */}
          <div className={styles.form}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("enter_email")}
              className={styles.input}
            />
            <button onClick={handleSubscribe} className={styles.button}>
              {t("subscribe")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}