import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuthPage = req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/";
    
    // If user is authenticated and trying to access login or home page, redirect to dashboard
    if (token && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    
    // If user is not authenticated and trying to access protected route, redirect to login
    if (!token && !isAuthPage && !req.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public routes
        if (req.nextUrl.pathname.startsWith("/api")) {
          return true;
        }
        
        if (req.nextUrl.pathname === "/") {
          return true;
        }
        
        if (req.nextUrl.pathname === "/login") {
          return true;
        }
        
        // Require authentication for all other routes
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [

    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

