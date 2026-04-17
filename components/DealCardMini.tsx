"use client";

type Deal = {
  id: number;
  shop: string;
  name: string;
  price: number;
  oldPrice: number;
  image?: string;
};

const deals: Deal[] = [
  { id: 1, shop: "Quán...", name: "DEAL NGON TÊN MÓN", price: 30000, oldPrice: 70000 },
  { id: 2, shop: "Quán...", name: "DEAL NGON TÊN MÓN", price: 30000, oldPrice: 70000 },
  { id: 3, shop: "Quán...", name: "DEAL NGON TÊN MÓN", price: 30000, oldPrice: 70000 },
];

export default function DealSection() {
  return (
    <div className="w-full flex justify-center px-4 mt-14">
      <div className="w-full max-w-[1200px]">

        {/* HEADER */}
        <div className="text-center mt-15 mb-12">
          <h2 className="text-5xl font-bold text-[var(--foreground)]">
            ✨ Deal Ngon Mỗi Ngày ✨
          </h2>

          <p className="text-gray-500 text-xl mt-4">
            Ưu đãi có hạn, đừng bỏ lỡ!
          </p>
        </div>

        {/* CARD LIST */}
        <div className="flex gap-8 justify-center flex-wrap">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="w-[350px] bg-[var(--surface)] rounded-3xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              {/* IMAGE */}
              <div className="relative">
                <div className="w-full h-[220px] bg-gray-300 flex items-center justify-center text-gray-500">
                  IMG
                </div>

                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-xl">
                  % GIỚI HẠN
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-6">

                <h3 className="text-3xl font-bold text-[var(--foreground)]">
                  {Math.round(
                    ((deal.oldPrice - deal.price) / deal.oldPrice) * 100
                  )}
                  % OFF
                </h3>

                <p className="text-[var(--foreground)] opacity-80 font-semibold text-xl mt-1">
                  {deal.name}
                </p>

                <p className="text-[var(--foreground)] opacity-60 mt-4 leading-relaxed">
                  Ưu đãi hấp dẫn dành riêng cho bạn. Thưởng thức món ngon
                  với mức giá siêu tiết kiệm hôm nay!
                </p>

                {/* PROMO BOX */}
                <div className="bg-[var(--border)] rounded-2xl p-4 mt-6 flex justify-between items-center">
                  <div>
                    <p className="text-[var(--foreground)] opacity-60 text-sm">
                      Mã khuyến mãi
                    </p>

                    <p className="font-bold text-xl text-[var(--foreground)]">
                      GIAMGIA{deal.id}50
                    </p>
                  </div>

                  <button className="border px-4 py-2 rounded-xl text-[var(--foreground)] hover:bg-black/10 transition">
                    Sao chép
                  </button>
                </div>

                {/* BUTTON */}
                <button className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-2xl transition">
                  Đặt ngay
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}