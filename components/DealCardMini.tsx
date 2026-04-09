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
  { id: 4, shop: "Quán...", name: "DEAL NGON TÊN MÓN", price: 30000, oldPrice: 70000 },
  { id: 5, shop: "Quán...", name: "DEAL NGON TÊN MÓN", price: 30000, oldPrice: 70000 },
];

export default function DealSection() {
  return (
    <div className="w-full flex justify-center px-4 mt-6">
      <div className="w-full max-w-[1185px] relative">

        {/* HEADER */}
        <div className="bg-[#2f3478] rounded-xl h-[100px] px-6 flex items-center shadow-md">
          <div>
            <h2 className="text-white font-semibold text-lg">
              Deal ngon quán hời
            </h2>

            <div className="mt-2 inline-block relative">
              <span className="bg-yellow-400 text-[#ff0000] font-bold px-4 py-1 text-sm rounded-l-md">
                Giảm đến 50 %
              </span>
              <span className="absolute right-[-8px] top-0.3 w-0 h-0 border-t-[12px] border-b-[14px] border-l-[9px] border-t-transparent border-b-transparent border-l-yellow-400"></span>
            </div>
          </div>
        </div>

        {/* CARD LIST */}
        <div className="absolute left-20 right-20 top-[90px] px-2">
          <div className="flex gap-6 justify-between">

            {deals.map((deal) => (
              <div
                key={deal.id}
                className="w-[180px] bg-white rounded-xl shadow-md p-3 hover:shadow-lg transition"
              >
                {/* IMAGE */}
                <div className="w-full h-[110px] bg-blue-400 rounded-lg flex items-center justify-center text-black font-bold">
                  IMG
                </div>
                {/* SHOP */}
                <p className="text-gray-400 text-sm mt-2">
                  {deal.shop}
                </p>
                {/* NAME */}
                <p className="text-black font-semibold text-sm leading-tight">
                  {deal.name}
                </p>
                {/* PRICE */}
                <div className="mt-1">
                  <p className="text-red-500 font-bold">
                    {deal.price.toLocaleString()}đ
                  </p>
                  <p className="text-gray-400 text-sm line-through">
                    {deal.oldPrice.toLocaleString()}đ
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* SPACING dưới để tránh bị đè */}
        <div className="h-[250px]"></div>
      </div>
    </div>
  );
}