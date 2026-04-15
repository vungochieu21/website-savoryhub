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

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        image: URL.createObjectURL(file),
      });
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={wrapper}>
      <div ref={modalRef} style={modal} className="shadow-lg">

        {/* Nút X */}
        <button style={closeBtn} onClick={onClose} className="btn btn-light">
          <FaTimes />
        </button>

        <h2 className="mb-4">Thông tin bắt buộc</h2>

        <div style={inputBox}>
          <FaFileAlt />
          <input
            className="form-control"
            placeholder="Tên địa điểm"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div style={inputBox}>
          <FaMapMarkerAlt />
          <input
            className="form-control"
            placeholder="Địa chỉ"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <h3 className="mt-4">Chọn tỉnh/ thành phố</h3>

        <div style={inputBox}>
          <select className="form-select">
            <option>Vietnam</option>
          </select>
        </div>

        <div style={inputBox}>
          <input
            className="form-control"
            placeholder="Chọn tỉnh..."
            value={form.province}
            onChange={(e) => setForm({ ...form, province: e.target.value })}
          />
        </div>

        <div style={inputBox}>
          <input
            className="form-control"
            placeholder="Chọn quận..."
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
          />
        </div>

        <h3 className="mt-4">Thông tin khác</h3>

        <div style={inputBox}>
          <FaMapMarkerAlt />
          <input
            className="form-control"
            placeholder="Vị trí bản đồ..."
            value={form.map}
            onChange={(e) => setForm({ ...form, map: e.target.value })}
          />
        </div>

        <div style={inputBox}>
          <FaPhone />
          <input
            className="form-control"
            placeholder="Số điện thoại..."
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div style={timeWrap}>
          <div style={inputBox}>
            <FaClock />
            <input
              className="form-control"
              type="time"
              value={form.openTime}
              onChange={(e) => setForm({ ...form, openTime: e.target.value })}
            />
          </div>

          <div style={inputBox}>
            <FaClock />
            <input
              className="form-control"
              type="time"
              value={form.closeTime}
              onChange={(e) => setForm({ ...form, closeTime: e.target.value })}
            />
          </div>
        </div>

        <div style={timeWrap}>
          <div style={inputBox}>
            <FaMoneyBill />
            <input
              className="form-control"
              placeholder="Giá thấp"
              value={form.minPrice}
              onChange={(e) => setForm({ ...form, minPrice: e.target.value })}
            />
          </div>

          <div style={inputBox}>
            <FaMoneyBill />
            <input
              className="form-control"
              placeholder="Giá cao"
              value={form.maxPrice}
              onChange={(e) => setForm({ ...form, maxPrice: e.target.value })}
            />
          </div>
        </div>

        <div style={inputBox}>
          <FaFileAlt />
          <textarea
            className="form-control"
            maxLength={300}
            placeholder="Nhập mô tả"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <div style={inputBox}>
          <FaImage />
          <input className="form-control" type="file" onChange={handleImage} />
        </div>

        <div style={{ textAlign: "right", marginTop: 20 }}>
          <button
            style={saveBtn}
            className="btn btn-warning"
            onClick={() => onSave(form)}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

/* STYLE */
const wrapper = {
  position: "fixed" as const,
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modal = {
  width: "650px",
  maxHeight: "90vh",
  overflowY: "auto" as const,
  background: "#fff",
  padding: "25px",
  borderRadius: "15px",
  position: "relative" as const,
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const closeBtn = {
  position: "absolute" as const,
  top: 15,
right: 15,
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
};

const inputBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "15px",
};

const timeWrap = {
  display: "flex",
  gap: "10px",
};

const saveBtn = {
  padding: "10px 20px",
  borderRadius: "8px",
  cursor: "pointer",
};