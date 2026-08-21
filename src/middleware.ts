/**
 * Next.js Middleware
 * Handles authentication, protected routes, and redirects
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const protectedRoutes = [
  "/account",
  "/checkout",
  "/orders",
];

// Routes that should redirect to home if already authenticated
const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

// API routes that require authentication
const protectedApiRoutes = [
  "/api/user",
  "/api/orders",
  "/api/checkout/complete",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get auth token from cookies
  const accessToken = request.cookies.get("access_token")?.value;
  const isAuthenticated = !!accessToken;

  // Check if accessing protected route without auth
  const isProtectedRoute = protectedRoutes.some((route) => 
    pathname.startsWith(route)
  );
  
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check if accessing auth routes while already authenticated
  const isAuthRoute = authRoutes.some((route) => 
    pathname.startsWith(route)
  );
  
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check protected API routes
  const isProtectedApiRoute = protectedApiRoutes.some((route) => 
    pathname.startsWith(route)
  );
  
  if (isProtectedApiRoute && !isAuthenticated) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication required",
        },
      },
      { status: 401 }
    );
  }

  // Add auth header to API requests if token exists
  if (pathname.startsWith("/api/") && accessToken) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-access-token", accessToken);
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
