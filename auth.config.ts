import type { NextAuthConfig } from "next-auth";

// Moving the type here is cleaner for the Next.js 16 parser
const authConfig: NextAuthConfig = {
  providers: [], 
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthRoute = ["/login", "/register"].includes(nextUrl.pathname);

      if (isAuthRoute) {
        if (isLoggedIn) return Response.redirect(new URL("/", nextUrl));
        return true;
      }
      return true;
    },
  },
};

export default authConfig;