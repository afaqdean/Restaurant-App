import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
    const isRootPage = req.nextUrl.pathname === "/";

    // Allow unauthenticated users to access root page (customer home page)
    if (isRootPage && !isAuth) {
      return NextResponse.next();
    }

    // If user is authenticated and accessing root page, redirect based on role
    if (isRootPage && isAuth) {
      if (token?.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      // For customers, allow access to root page (no redirect needed)
      return NextResponse.next();
    }

    // If user is authenticated but doesn't have admin role for admin pages
    if (isAdminPage && isAuth && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to auth pages and root page for everyone
        if (
          req.nextUrl.pathname.startsWith("/auth") ||
          req.nextUrl.pathname === "/"
        ) {
          return true;
        }
        // Require authentication for admin pages
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/admin/:path*"],
};
