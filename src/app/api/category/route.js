import products  from "../../../utils/data/products";

export async function GET() {
  // simulate delay
  await new Promise((r) => setTimeout(r, 800));

  return new Response(JSON.stringify(products), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}