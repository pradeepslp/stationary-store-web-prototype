import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply middleware to dashboard routes
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  // Allow login page access without authentication
  if (pathname === "/dashboard/login") {
    return NextResponse.next();
  }

  // Check for valid JWT token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // No valid token found - redirect to login
  if (!token) {
    const loginUrl = new URL("/dashboard/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Token is valid, continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
