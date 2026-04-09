"use client";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  // 🔥 DATA GIẢ (sau này bạn thay bằng API)
  const foods = [
    "Phở bò",
    "Bún bò Huế",
    "Cơm tấm",
    "Trà sữa",
    "Bánh mì",
  ];

  // 🔥 FILTER (giống Foody)
  const result = foods.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
        🔍 Kết quả cho: {query}
      </h1>

      {/* KẾT QUẢ */}
      <div style={{ marginTop: "20px" }}>
        {result.length > 0 ? (
          result.map((item, index) => (
            <div key={index} style={{ padding: "10px 0" }}>
              🍜 {item}
            </div>
          ))
        ) : (
          <div>❌ Không tìm thấy kết quả</div>
        )}
      </div>
    </div>
  );
}