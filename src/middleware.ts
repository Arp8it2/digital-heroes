import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/draws/:path*",
    "/winners/:path*",
    "/scores/:path*",
    "/charities/:path*",
    "/contributions/:path*",
    "/profile/:path*",
    "/subscriptions/:path*",
    "/admin/:path*",
  ],
};