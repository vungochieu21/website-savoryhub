"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/utils/Storage";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // 🔥 FIX SCROLL (CHỈ THÊM, KHÔNG ĐỤNG GÌ KHÁC)
  useEffect(() => {
    document.body.classList.add("no-scroll");
    document.body.style.overflow = "hidden";

    return () => {
      document.body.classList.remove("no-scroll");
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    if (!form.email || !form.password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const res = loginUser(form.email, form.password);

    if (!res.success) {
      setError("Sai email hoặc mật khẩu");
      return;
    }

    router.replace("/");
  };

  return (
    <div className="page">
      <div className="card">

        <div className="logo">🍜 Tastii</div>
        <p className="subtitle">Đăng nhập để tiếp tục</p>

        {error && <p className="error">{error}</p>}

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

        <button onClick={handleLogin}>
          Đăng nhập
        </button>

        <p className="footerText">
          Chưa có tài khoản?{" "}
          <span onClick={() => router.push("/register")}>
            Đăng ký
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