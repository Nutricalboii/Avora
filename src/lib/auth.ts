import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Engineered by Vaibhav Sharma · github.com/Nutricalboii

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error(
    "[auth] NEXTAUTH_SECRET is not set. Set it in your .env file or Vercel environment variables."
  );
}

if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
  throw new Error(
    "[auth] ADMIN_EMAIL and ADMIN_PASSWORD must be set as environment variables. Never hardcode credentials."
  );
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@avora.io" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return {
            id: "1",
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
            role: "ADMIN",
          } as any;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) (session.user as any).role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
