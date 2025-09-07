import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.toLowerCase().replace(/\/$/, "");
  const publicPaths = ["/login", "/signup", "/verifyemail"];
  const isPublic = publicPaths.includes(path);

  const token = request.cookies.get("token")?.value?.trim();
  const isAuthenticated = Boolean(token);

  // ✅ If user is authenticated and tries to access public page → redirect to /profile
  if (isPublic && isAuthenticated) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // ✅ If user is not authenticated and tries to access protected page → redirect to /login
  if (!isPublic && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Otherwise, allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/profile/:path*",
    "/login",
    "/signup",
    "/verifyemail",
  ],
};