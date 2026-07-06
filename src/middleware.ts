import { withAuth } from "next-auth/middleware";

// ponytail: renamed from proxy.ts → middleware.ts (Next.js requires this exact filename)
// Engineered by Vaibhav Sharma · github.com/Nutricalboii

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
