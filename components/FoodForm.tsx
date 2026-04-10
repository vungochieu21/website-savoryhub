"use client";
import { useState } from "react";

export default function FoodForm({ onClose, onSave, initialData }: any) {
  const [form, setForm] = useState(
    initialData || {
      name: "",
      address: "",
      image: "",
      menu: [{ name: "", price: "" }],
      map: "",
      comments: 0,
      photos: 0,
    }
  );

  // thêm món
  const addMenu = () => {
    setForm({
      ...form,
      menu: [...form.menu, { name: "", price: "" }],
    });
  };

  // upload ảnh
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
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        width: "600px",
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
      }}>
        <h2>Thêm / sửa quán</h2>

        {/* tên */}
        <input
          placeholder="Tên quán"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* địa chỉ */}
        <input
          placeholder="Địa chỉ"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        {/* upload ảnh */}
        <input type="file" onChange={handleImage} />

        {/* menu */}
        <h4>Menu</h4>
        {form.menu.map((m: any, i: number) => (
          <div key={i}>
            <input
              placeholder="Tên món"
              value={m.name}
              onChange={(e) => {
                const newMenu = [...form.menu];
                newMenu[i].name = e.target.value;
                setForm({ ...form, menu: newMenu });
              }}
            />
            <input
              placeholder="Giá"
              value={m.price}
              onChange={(e) => {
                const newMenu = [...form.menu];
                newMenu[i].price = e.target.value;
                setForm({ ...form, menu: newMenu });
              }}
            />
          </div>
        ))}

        <button onClick={addMenu}>➕ Thêm món</button>

        {/* google map */}
        <input
          placeholder="Link Google Map"
          value={form.map}
          onChange={(e) => setForm({ ...form, map: e.target.value })}
        />

        {/* BUTTON */}
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => onSave(form)}>Lưu</button>
          <button onClick={onClose}>Huỷ</button>
        </div>
      </div>
    </div>
  );
}