"use client";

import Image from "next/image";

const deals = [
  {
    id: 1,
    name: "Bún bò Huế",
    price: "30.000đ",
    oldPrice: "60.000đ",
    img: "/food1.jpg",
  },
  {
    id: 2,
    name: "Trà sữa",
    price: "25.000đ",
    oldPrice: "50.000đ",
    img: "/food2.jpg",
  },
  {
    id: 3,
    name: "Cơm tấm",
    price: "40.000đ",
    oldPrice: "80.000đ",
    img: "/food3.jpg",
  },
  {
    id: 4,
    name: "Gà rán",
    price: "35.000đ",
    oldPrice: "70.000đ",
    img: "/food4.jpg",
  },
];
export default function DealSection() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        
        <div className="shadow-lg overflow-hidden">
          
          {/* HEADER */}
          <div className="bg-[#2D326F] text-white p-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">🔥 Deal ngon mỗi ngày</h2>
            <span className="bg-yellow-400 text-[#C55151] px-3 py-1 rounded-full text-sm font-bold">
              Giảm đến 50%
            </span>
          </div>

          {/* LIST */}
          <div className="flex gap-4 overflow-x-auto p-4">
            {deals.map((item) => (
              <div
                key={item.id}
                className="min-w-[140px] bg-gray-50 rounded-xl p-2 hover:scale-105 transition"
              >
                <div className="relative w-full h-24 rounded-lg overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-sm mt-2 line-clamp-1">{item.name}</p>

                <p className="text-red-500 font-bold text-sm">
                  {item.price}
                </p>

                <p className="text-gray-400 text-xs line-through">
                  {item.oldPrice}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}