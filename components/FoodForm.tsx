"use client";
import { useState } from "react";
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
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        image: URL.createObjectURL(file),
      });
    }
  };
  return (
    <div style={overlay}>
      <div style={modal}>
        {/* Nút X */}
        <button style={closeBtn} onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Thông tin bắt buộc</h2>
        {/* Tên */}
        <div style={inputBox}>
          <FaFileAlt />
          <input
            placeholder="Tên địa điểm"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        {/* Địa chỉ */}
        <div style={inputBox}>
          <FaMapMarkerAlt />
          <input
            placeholder="Địa chỉ"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>
        <h3>Chọn tỉnh/ thành phố</h3>
        <div style={inputBox}>
          <select>
            <option>Vietnam</option>
          </select>
        </div>
        <div style={inputBox}>
          <input
            placeholder="Chọn tỉnh..."
            value={form.province}
            onChange={(e) => setForm({ ...form, province: e.target.value })}
          />
        </div>
        <div style={inputBox}>
          <input
            placeholder="Chọn quận..."
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
          />
        </div>
        <h3>Thông tin khác</h3>
        {/* Map */}
        <div style={inputBox}>
          <FaMapMarkerAlt />
          <input
            placeholder="Vị trí bản đồ..."
            value={form.map}
            onChange={(e) => setForm({ ...form, map: e.target.value })}
          />
        </div>
        {/* Phone */}
        <div style={inputBox}>
          <FaPhone />
          <input
            placeholder="Số điện thoại..."
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        {/* Giờ mở */}
        <div style={timeWrap}>
          <div style={inputBox}>
            <FaClock />
            <input
              type="time"
              value={form.openTime}
              onChange={(e) => setForm({ ...form, openTime: e.target.value })}
            />
          </div>
          <div style={inputBox}>
            <FaClock />
            <input
              type="time"
              value={form.closeTime}
              onChange={(e) => setForm({ ...form, closeTime: e.target.value })}
            />
          </div>
        </div>
        {/* Giá */}
        <div style={timeWrap}>
          <div style={inputBox}>
            <FaMoneyBill />
            <input
              placeholder="Giá thấp"
              value={form.minPrice}
              onChange={(e) => setForm({ ...form, minPrice: e.target.value })}
            />
          </div>
          <div style={inputBox}>
            <FaMoneyBill />
            <input
              placeholder="Giá cao"
              value={form.maxPrice}
              onChange={(e) => setForm({ ...form, maxPrice: e.target.value })}
            />
          </div>
        </div>
        {/* Mô tả */}
        <div style={inputBox}>
          <FaFileAlt />
          <textarea
            maxLength={300}
            placeholder="Nhập mô tả (tối đa 300 chữ)"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>
        {/* Upload ảnh */}
        <div style={inputBox}>
          <FaImage />
          <input type="file" onChange={handleImage} />
        </div>
        {/* Nút xác nhận */}
        <div style={{ textAlign: "right", marginTop: 20 }}>
          <button style={saveBtn} onClick={() => onSave(form)}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
/* STYLE */
const overlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const modal = {
  width: "650px",
  maxHeight: "90vh",
  overflowY: "auto" as const,
  background: "#fff",
  padding: "25px",
  borderRadius: "15px",
  position: "relative" as const,
};
const closeBtn = {
  position: "absolute" as const,
  top: 15,
  right: 15,
  border: "none",
  background: "none",
  fontSize: "20px",
  cursor: "pointer",
};

const inputBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "15px",
  border: "1px solid #ddd",
  padding: "10px",
  borderRadius: "10px",
};
const timeWrap = {
  display: "flex",
  gap: "10px",
};
const saveBtn = {
  padding: "10px 20px",
  background: "#ff5722",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};