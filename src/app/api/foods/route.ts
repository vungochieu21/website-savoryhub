import foods from "src/data/food.json";

export async function GET() {
  return Response.json(foods);
}