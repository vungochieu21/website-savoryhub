"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/utils/Storage";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // 🔥 CHỈ THÊM CÁI NÀY - KHÔNG ĐỤNG GÌ KHÁC
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const res = registerUser({
      id: Date.now(),
      ...form,
    });

    if (!res.success) {
      setError(res.message);
      return;
    }

    alert("Đăng ký thành công!");
    router.push("/login");
  };

  return (
    <div className="page">
      <div className="card">

        <div className="logo">🍜 Tastii</div>
        <p className="subtitle">Tạo tài khoản để bắt đầu trải nghiệm</p>

        {error && <p className="error">{error}</p>}

        <input
          name="name"
          placeholder="Tên của bạn"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Mật khẩu"
          onChange={handleChange}
        />

        <button onClick={handleRegister}>
          Đăng ký
        </button>

        <p className="footerText">
          Đã có tài khoản?{" "}
          <span onClick={() => router.push("/login")}>
            Đăng nhập
          </span>
        </p>

      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #f5f5f5, #eaeaea);
        }

        .card {
          width: 480px;
          max-width: 96%;
          padding: 60px 45px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 25px 70px rgba(0,0,0,0.18);
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: center;
        }

        .logo {
          font-size: 34px;
          font-weight: bold;
          color: #b30000;
        }

        .subtitle {
          font-size: 14px;
          opacity: 0.6;
        }

        input {
          padding: 14px;
          border: 1px solid #ddd;
          border-radius: 10px;
          outline: none;
        }

        button {
          padding: 14px;
          background: #b30000;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
        }

        .error {
          color: red;
          font-size: 13px;
        }

        .footerText {
          font-size: 13px;
        }

        span {
          color: #b30000;
          cursor: pointer;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}