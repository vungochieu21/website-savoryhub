"use client";

import { useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import styles from "./ExclusiveDeal.module.css";
import { useLanguage } from "src/locales/context/LanguageContext";

export default function ExclusiveDeal() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const { t } = useLanguage();

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
        <div className={styles.toast}>
          {success ? <FaCheckCircle /> : <FaExclamationCircle />}
          {message}
        </div>
      )}

      <div className={styles.container}>

        <div className={styles.content}>

          <h2 className={styles.title}>
            {t("exclusive_title")}
          </h2>

          <p className={styles.desc}>
            {t("exclusive_desc")}
          </p>

          {/* FORM */}
          <div className={styles.form}>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("enter_email")}
              className={styles.input}
            />

            <button
              onClick={handleSubscribe}
              className={styles.button}
            >
              {t("subscribe")}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}