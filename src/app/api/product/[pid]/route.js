import { NextResponse } from "next/server";
import products from "../../../../utils/data/products";

export async function GET(req, { params }) {
  const { pid } = await params; // ✅ ONLY params is awaited

  console.log("PID:", pid);

  const product = products.find((x) => x.id == pid);

  return NextResponse.json(
    product || { message: "Product not found" }
  );
}