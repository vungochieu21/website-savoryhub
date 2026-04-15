"use client";

import Image from "next/image";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  content: string;
};

const data: Testimonial[] = [
  {
    name: "Nguyễn Minh Tuấn",
    role: "Nhân viên văn phòng",
    avatar: "/avatar1.jpg",
    content: "Quán rất phù hợp để đi ăn trưa cùng đồng nghiệp.",
  },
  {
    name: "Trần Thị Ngọc Anh",
    role: "Sinh viên",
    avatar: "/avatar2.jpg",
    content: "Giá ổn mà đồ ăn ngon.",
  },
  {
    name: "Lê Hoàng Nam",
    role: "Freelancer",
    avatar: "/avatar3.jpg",
    content: "Không gian sạch sẽ, nhân viên thân thiện.",
  },
  {
    name: "Phạm Thu Hương",
    role: "Nội trợ",
    avatar: "/avatar4.jpg",
    content: "Gia đình mình rất thích ăn ở đây.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16  overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Đánh giá khách hàng
        </h2>

        {/* KHUNG HIỂN THỊ 3 CARD */}
        <div className="overflow-hidden">
          <div className="flex gap-6 animate-scroll">
            {[...data, ...data].map((item, index) => (
              <div
                key={index}
                className="w-1/3 flex-shrink-0 bg-white p-6 rounded-2xl shadow-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />

                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.role}
                    </p>
                  </div>
                </div>

                <div className="text-orange-400 mb-3">
                  ★★★★★
                </div>

                <p className="text-gray-600 text-sm">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}