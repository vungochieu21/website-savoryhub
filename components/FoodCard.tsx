export default function FoodCard() {
  return (
    <div style={{
      width: "200px",
      border: "1px solid #ccc",
      padding: "10px",
      borderRadius: "10px"
    }}>
      <div style={{ height: "100px", background: "#ddd" }}>IMG</div>
      <h4>Tên quán</h4>
      <p>Địa chỉ...</p>
      <p>⭐ 4.5</p>
    </div>
  );
}