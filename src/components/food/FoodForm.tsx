"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaMoneyBill,
  FaImage,
  FaFileAlt,
  FaTimes,
} from "react-icons/fa";

import styles from "./FoodForm.module.css";

export default function FoodForm({ onClose, onSave }: any) {
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    province: "",
    district: "",
    map: "",
    phone: "",
    openTime: "",
    closeTime: "",
    minPrice: "",
    maxPrice: "",
    description: "",
    image: "",
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!modalRef.current) return;

      if (!modalRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleImage = (e: any) => {
    if (!mounted) return;

    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      image: url,
    }));
  };

  if (!mounted) return null;

  return (
    <div className={styles.wrapper}>
      <div ref={modalRef} className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <FaTimes />
        </button>

        <h2 className={styles.title}>Thông tin bắt buộc</h2>

        <div className={styles.inputBox}>
          <FaFileAlt />
          <input
            className={styles.input}
            placeholder="Tên địa điểm"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className={styles.inputBox}>
          <FaMapMarkerAlt />
          <input
            className={styles.input}
            placeholder="Địa chỉ"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <h3 className={styles.subTitle}>Chọn tỉnh / thành phố</h3>

        <div className={styles.inputBox}>
          <select className={styles.input}>
            <option>Việt Nam</option>
          </select>
        </div>

        <div className={styles.inputBox}>
          <input
            className={styles.input}
            placeholder="Nhập tỉnh / thành..."
            value={form.province}
            onChange={(e) => setForm({ ...form, province: e.target.value })}
          />
        </div>

        <div className={styles.inputBox}>
          <input
            className={styles.input}
            placeholder="Nhập quận / huyện..."
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
          />
        </div>

        <h3 className={styles.subTitle}>Thông tin khác</h3>

        <div className={styles.inputBox}>
          <FaMapMarkerAlt />
          <input
            className={styles.input}
            placeholder="Link Google Maps..."
            value={form.map}
            onChange={(e) => setForm({ ...form, map: e.target.value })}
          />
        </div>

        <div className={styles.inputBox}>
          <FaPhone />
          <input
            className={styles.input}
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div className={styles.timeWrap}>
          <div className={styles.inputBox}>
            <FaClock />
            <input
              className={styles.input}
              type="time"
              value={form.openTime}
              onChange={(e) =>
                setForm({ ...form, openTime: e.target.value })
              }
            />
          </div>

          <div className={styles.inputBox}>
            <FaClock />
            <input
              className={styles.input}
              type="time"
              value={form.closeTime}
              onChange={(e) =>
                setForm({ ...form, closeTime: e.target.value })
              }
            />
          </div>
        </div>

        <div className={styles.timeWrap}>
          <div className={styles.inputBox}>
            <FaMoneyBill />
            <input
              className={styles.input}
              placeholder="Giá thấp (VNĐ)"
              value={form.minPrice}
              onChange={(e) =>
                setForm({ ...form, minPrice: e.target.value })
              }
            />
          </div>

          <div className={styles.inputBox}>
            <FaMoneyBill />
            <input
              className={styles.input}
              placeholder="Giá cao (VNĐ)"
              value={form.maxPrice}
              onChange={(e) =>
                setForm({ ...form, maxPrice: e.target.value })
              }
            />
          </div>
        </div>

        <div className={styles.inputBox}>
          <FaFileAlt />
          <textarea
            className={styles.input}
            style={{ height: 80 }}
            maxLength={300}
            placeholder="Mô tả địa điểm..."
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <div className={styles.inputBox}>
          <FaImage />
          <label className={styles.fileLabel}>
            Chọn hình ảnh
            <input
              type="file"
              onChange={handleImage}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <div style={{ textAlign: "right", marginTop: 20 }}>
          <button
            className={styles.saveBtn}
            onClick={() => onSave?.(form)}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}