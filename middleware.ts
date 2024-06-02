import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: any) {
    const url:string = req?.nextUrl?.pathname;
    const role = req?.nextauth?.token?.role;
    console.log("req", url);
    console.log("role", role);

    // if(!role){
    //   role = 'admin'
    // }
    
    // if (url.startsWith("/siswa") === true) {
    //     if (role != "siswa") {
    //         return NextResponse.redirect(new URL("/admin", req.url));
    //     } else {
    //         return NextResponse.next()
    //     }
    // }
    
    if (url.startsWith("/admin") === true) {
      if (role != "admin") {
        return NextResponse.redirect(new URL("/siswa", req.url));
      } else {
        return NextResponse.next()
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
  matcher: ["/admin", "/admin/:path*", "/siswa", "/siswa/:path*"],
};
