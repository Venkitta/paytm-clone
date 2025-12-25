import { withAuth } from "next-auth/middleware";

// THIS decides what happens when middleware runs
export default withAuth({
  pages: {
    signIn: "/auth/signin", // where to send unauth users
  },
});

// THIS decides WHEN middleware runs
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/bank-simulator/:path*",
  ],
};
