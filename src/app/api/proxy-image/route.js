import { NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set([
  "images.dhirago.com",
  "res.cloudinary.com",
  "pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev",
  "pub-f4b2c7f0b6f74bbdb5e18f57a2251298.r2.dev",
  "dhirago-images-761186487122-eu-north-1-an.s3.eu-north-1.amazonaws.com",
]);

export async function GET(request) {
  const rawUrl = request.nextUrl.searchParams.get("url");
  if (!rawUrl) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  let target;
  try {
    target = new URL(rawUrl);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  if (!["http:", "https:"].includes(target.protocol)) {
    return NextResponse.json({ error: "Unsupported protocol" }, { status: 400 });
  }

  if (!ALLOWED_HOSTS.has(target.hostname)) {
    return NextResponse.json({ error: "Host not allowed" }, { status: 403 });
  }

  try {
    const upstream = await fetch(target.toString(), {
      headers: {
        Accept: "image/*,*/*",
      },
      // CDN images can be cached safely
      next: { revalidate: 3600 },
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Upstream failed: ${upstream.status}` },
        { status: 502 },
      );
    }

    const contentType =
      upstream.headers.get("content-type") || "application/octet-stream";
    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return NextResponse.json({ error: "Proxy failed" }, { status: 500 });
  }
}
