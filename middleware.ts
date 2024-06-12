import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: any) {
    const url: string = req?.nextUrl?.pathname;
    const role = req?.nextauth?.token?.role;
    console.log("req", url);
    console.log("role", role);

    // Role-based redirection logic
    if (url.startsWith("/peminjam")) {
      if (role !== "peminjam") {
        return NextResponse.redirect(new URL("/notaccess", req.url));
      } else {
        return NextResponse.next();
      }
    }

    // if (url.startsWith("/admin")) {
    //     if (role !== "admin") {
    //         return NextResponse.redirect(new URL("/notaccess", req.url));
    //     } else {
    //         return NextResponse.next();
    //     }
    // }

    //agar admin bisa akses semua
    if (url.startsWith("/admin")) {
      // Allow admin access to all pages
      return NextResponse.next();
    }

    if (url.startsWith("/petugas")) {
      if (role !== "petugas") {
        return NextResponse.redirect(new URL("/notaccess", req.url));
      } else {
        return NextResponse.next();
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token) return true;
        return false;
      },
    },
    pages: {
      signIn: "/auth/login",
      error: "/api/auth/error",
    },
  }
);

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/peminjam",
    "/peminjam/:path*",
    "/petugas",
    "/petugas/:path*",
  ],
};
