import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/login",
  "/signup",
];

export function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get(
      "sb-access-token"
    );

  const pathname =
    request.nextUrl.pathname;

  if (
    publicRoutes.includes(
      pathname
    )
  ) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

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