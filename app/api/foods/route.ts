import foods from "@/data/food.json";

export async function GET() {
  return Response.json(foods);
}