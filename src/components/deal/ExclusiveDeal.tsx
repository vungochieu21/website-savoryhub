"use client";

import { useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import styles from "./ExclusiveDeal.module.css";

export default function ExclusiveDeal() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = () => {
    if (email.endsWith("@gmail.com")) {
      setMessage("Đăng ký nhận ưu đãi độc quyền thành công!");
      setSuccess(true);
      setEmail("");
    } else {
      setMessage("Vui lòng nhập địa chỉ email hợp lệ.");
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
            Nhận Ưu Đãi Độc Quyền
          </h2>

          <p className={styles.desc}>
            Đăng ký để nhận nhiều ưu đãi đặc biệt và các chương trình giảm giá độc quyền!
          </p>

          {/* FORM */}
          <div className={styles.form}>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Điền email của bạn..."
              className={styles.input}
            />

            <button
              onClick={handleSubscribe}
              className={styles.button}
            >
              Đăng kí
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}