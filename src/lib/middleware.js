import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith("/account");

  // ❌ Not logged in → block access
  if (isAuthPage && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*"],
};