import { NextResponse } from "next/server";

export async function GET() {
  const whatsappNumber = "917742711543";

  const message = encodeURIComponent(
    "Hi Dhirago, I need help."
  );

  return NextResponse.redirect(
    `https://wa.me/${whatsappNumber}?text=${message}`
  );
}