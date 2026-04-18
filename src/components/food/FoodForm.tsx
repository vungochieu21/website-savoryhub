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
    <div style={wrapper}>
      <div ref={modalRef} style={modal}>
        <button style={closeBtn} onClick={onClose}>
          <FaTimes />
        </button>

        <h2 style={title}>Thông tin bắt buộc</h2>

        <div style={inputBox}>
          <FaFileAlt />
          <input
            style={input}
            placeholder="Tên địa điểm"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div style={inputBox}>
          <FaMapMarkerAlt />
          <input
            style={input}
            placeholder="Địa chỉ"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <h3 style={subTitle}>Chọn tỉnh / thành phố</h3>

        <div style={inputBox}>
          <select style={input}>
            <option>Việt Nam</option>
          </select>
        </div>

        <div style={inputBox}>
          <input
            style={input}
            placeholder="Nhập tỉnh / thành..."
            value={form.province}
            onChange={(e) => setForm({ ...form, province: e.target.value })}
          />
        </div>

        <div style={inputBox}>
          <input
            style={input}
            placeholder="Nhập quận / huyện..."
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
          />
        </div>

        <h3 style={subTitle}>Thông tin khác</h3>

        <div style={inputBox}>
          <FaMapMarkerAlt />
          <input
            style={input}
            placeholder="Link Google Maps..."
            value={form.map}
            onChange={(e) => setForm({ ...form, map: e.target.value })}
          />
        </div>

        <div style={inputBox}>
          <FaPhone />
          <input
            style={input}
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div style={timeWrap}>
          <div style={{ ...inputBox, color: "var(--card-text)" }}>
            <FaClock />
            <input
              style={input}
              type="time"
              value={form.openTime}
              onChange={(e) =>
                setForm({ ...form, openTime: e.target.value })
              }
            />
          </div>

          <div style={{ ...inputBox, color: "var(--card-text)" }}>
            <FaClock />
            <input
              style={input}
              type="time"
              value={form.closeTime}
              onChange={(e) =>
                setForm({ ...form, closeTime: e.target.value })
              }
            />
          </div>
        </div>

        <div style={timeWrap}>
          <div style={inputBox}>
            <FaMoneyBill />
            <input
              style={input}
              placeholder="Giá thấp (VNĐ)"
              value={form.minPrice}
              onChange={(e) =>
                setForm({ ...form, minPrice: e.target.value })
              }
            />
          </div>

          <div style={inputBox}>
            <FaMoneyBill />
            <input
              style={input}
              placeholder="Giá cao (VNĐ)"
              value={form.maxPrice}
              onChange={(e) =>
                setForm({ ...form, maxPrice: e.target.value })
              }
            />
          </div>
        </div>

        <div style={inputBox}>
          <FaFileAlt />
          <textarea
            style={{ ...input, height: 80 }}
            maxLength={300}
            placeholder="Mô tả địa điểm..."
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <div style={inputBox}>
          <FaImage />
          <label style={fileLabel}>
            Chọn hình ảnh
            <input
              type="file"
              onChange={handleImage}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <div style={{ textAlign: "right", marginTop: 20 }}>
          <button style={saveBtn} onClick={() => onSave?.(form)}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

/* STYLE */
const wrapper: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modal: React.CSSProperties = {
  width: "650px",
  maxHeight: "90vh",
  overflowY: "auto",
  background: "var(--surface)",
  color: "var(--card-text)",
  padding: "25px",
  borderRadius: "15px",
  position: "relative",
};

const title: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const subTitle: React.CSSProperties = {
  marginTop: "20px",
  marginBottom: "10px",
  fontWeight: "bold",
};

const closeBtn: React.CSSProperties = {
  position: "absolute",
  top: 15,
  right: 15,
  fontSize: "20px",
  cursor: "pointer",
  background: "transparent",
  border: "none",
};

const inputBox: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "15px",
};

const input: React.CSSProperties = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  background: "transparent",
  color: "var(--card-text)",
};

const timeWrap: React.CSSProperties = {
  display: "flex",
  gap: "10px",
};

const saveBtn: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#b30000",
  color: "#fff",
  border: "none",
};

const fileLabel: React.CSSProperties = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  cursor: "pointer",
  background: "transparent",
  color: "var(--card-text)",
};