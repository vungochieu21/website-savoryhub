"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "src/utils/Storage";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

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
    if (!form.name || !form.password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const res = loginUser(form.name, form.password);

    if (!res.success) {
      setError("Sai tài khoản hoặc mật khẩu");
      return;
    }

    router.replace("/");
  };

  return (
    <div className="page">

      {/* BACK BUTTON */}
      <button className="backBtn" onClick={() => router.back()}>
        <FaArrowLeft /> Quay lại
      </button>

      <div className="card">

        <div className="logo">
          <img src="/Logo.png" alt="Tastii" />
        </div>
        <p className="subtitle">Đăng nhập để tiếp tục</p>

        {error && <p className="error">{error}</p>}

        <input
          name="name"
          placeholder="Tên tài khoản"
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <div className="password-wrap">
          <input
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="Mật khẩu"
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />

          <span
            className="eye"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

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
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #ffffff, #fb2121);
          position: relative;
        }
        
        .logo img {
          width: 190px;
          height: auto;
          object-fit: contain;
        }
        .logo {
          display: flex;
          justify-content: center;
        }

        :global(.dark) .page {
          background: linear-gradient(135deg, #000000, #fb21219c);
        }

        .card {
          width: 480px;
          padding: 60px 45px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 25px 70px #000000bb;
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: center;
        }

        :global(.dark) .card {
          background: #333333;
          color: white;
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
          border: 1px solid #dddddd;
          border-radius: 10px;
          outline: none;
          width: 100%;
        }

        :global(.dark) input {
          background: #2a2a2a;
          border: 1px solid #444;
          color: white;
        }

        .password-wrap {
          position: relative;
        }

        .eye {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          opacity: 0.7;
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

        span {
          color: #b30000;
          cursor: pointer;
          font-weight: bold;
        }

        /* STYLE BACK */
        .backBtn {
          position: absolute;
          top: 20px;
          left: 20px;
          background: transparent;
          border: none;
          color: #333333;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0.7;
          padding: 6px 8px;
        }

        .backBtn:hover {
          opacity: 1;
          text-decoration: underline;
        }

        :global(.dark) .backBtn {
          color: #ccc;
        }
      `}</style>
    </div>
  );
}