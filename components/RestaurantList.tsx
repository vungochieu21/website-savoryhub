import FoodCard from "./FoodCard";

export default function RestaurantList() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "10px"
    }}>
      {Array(8).fill(0).map((_, i) => (
        <FoodCard key={i} />
      ))}
    </div>
  );
}