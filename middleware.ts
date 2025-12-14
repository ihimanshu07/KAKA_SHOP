import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.next();
    }
    
    if (req.nextUrl.pathname === "/") {
      return NextResponse.next();
    }
    
    if (req.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith("/api")) {
          return true;
        }
        
        if (req.nextUrl.pathname === "/") {
          return true;
        }
        
        if (req.nextUrl.pathname === "/login") {
          return true;
        }
        
        return !!token;
      },
    },
    pages: {
      signIn: "/",
    },
  }
);

export const config = {
  matcher: [

    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

