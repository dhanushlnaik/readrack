export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/profile/:path*", // protect profile pages
    "/admin/:path*",   // protect admin routes
    "/submit/:path*",  // if you want to protect review submissions
  ],
};
