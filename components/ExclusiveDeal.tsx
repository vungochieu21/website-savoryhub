"use client";

import { useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

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
    <div className="w-full flex justify-center px-1 mt-30 relative">

      {/* THÔNG BÁO */}
      {message && (
        <div
          className={`
            fixed top-20 left-1/2 -translate-x-1/2
            flex items-center gap-3
            px-8 py-4 rounded-xl shadow-xl z-50
            text-lg font-semibold
            ${success ? "bg-red-500 text-white" : "bg-red-500 text-white"}
          `}
        >
          {success ? <FaCheckCircle /> : <FaExclamationCircle />}
          {message}
        </div>
      )}

      <div className="w-full max-w-[1800px] rounded-[24px] overflow-hidden bg-gradient-to-r from-[#020617] via-black to-[#1e293b] px-6 py-8">

        <div className="flex flex-col items-center text-center">

          <h2 className="text-white text-3xl font-bold">
            Nhận Ưu Đãi Độc Quyền
          </h2>

          <p className="text-gray-300 text-xl mt-3 max-w-[850px] leading-relaxed">
            Đăng ký để nhận nhiều ưu đãi đặc biệt và các chương trình giảm giá độc quyền!
          </p>

          {/* INPUT + BUTTON */}
          <div className="flex gap-5 mt-10 flex-wrap justify-center items-center">

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Điền email của bạn..."
              className="
                w-[420px]
                h-[55px]
                rounded-2xl
                px-6
                text-lg
                outline-none
                bg-white
                text-black
                shadow-md
                placeholder:text-gray-400
                focus:ring-4
                focus:ring-red-200
                transition
              "
            />

            <button
              onClick={handleSubscribe}
              className="
                bg-red-600
                hover:bg-red-700
                hover:scale-105
                transition
                text-white
                font-semibold
                px-12
                h-[55px]
                rounded-2xl
                shadow-md
              "
            >
              Đăng kí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}