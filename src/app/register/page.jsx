"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "src/utils/Storage";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { useLanguage } from "src/locales/context/LanguageContext";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

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
    if (!form.name || !form.email || !form.password || !form.address) {
      setError(t("login_error_empty"));
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

    alert(t("register_success"));
    router.push("/login");
  };

  return (
    <div className="page">

      <button className="backBtn" onClick={() => router.back()}>
        <FaArrowLeft /> {t("back")}
      </button>

      <div className="card">

        <div className="logo">
          <img src="/Logo.png" alt="Tastii" />
        </div>

        <p className="subtitle">{t("register_subtitle")}</p>

        {error && <p className="error">{error}</p>}

        <input name="name" placeholder={t("username")} onChange={handleChange} />

        <input name="email" placeholder={t("email")} onChange={handleChange} />

        <div className="password-wrap">
          <input
            name="password"
            type={showPass ? "text" : "password"}
            placeholder={t("password")}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleRegister()}
          />

          <span className="eye" onClick={() => setShowPass(!showPass)}>
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <input
          name="address"
          placeholder={t("address")}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleRegister()}
        />

        <button onClick={handleRegister}>
          {t("register")}
        </button>

        <p className="footerText">
          {t("have_account")}{" "}
          <span onClick={() => router.push("/login")}>
            {t("login")}
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
          position: relative; /* QUAN TRỌNG */
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

        /* BACK BUTTON */
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