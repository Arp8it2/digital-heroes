import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(
  request: NextRequest
) {
  const pathname =
    request.nextUrl.pathname;

  // Protected Routes

  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/subscriptions",
    "/admin",
  ];

  const isProtected =
    protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

  if (!isProtected) {
    return NextResponse.next();
  }

  const hasSession =
    request.cookies.get(
      "sb-access-token"
    ) ||
    request.cookies.get(
      "supabase-auth-token"
    );

  if (!hasSession) {
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
    "/profile/:path*",
    "/subscriptions/:path*",
    "/admin/:path*",
  ],
};