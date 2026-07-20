import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Engineered by Vaibhav Sharma · github.com/Nutricalboii
// ponytail: env validation runs lazily inside authorize(), not at module load
// so build-time static generation doesn't fail when env vars aren't set

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@avora.io" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Runtime-only env validation — fails fast on login attempt if not configured
        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
          console.error('[auth] ADMIN_EMAIL or ADMIN_PASSWORD env vars are not set');
          return null;
        }
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return {
            id: '1',
            name: 'Admin',
            email: process.env.ADMIN_EMAIL,
            role: 'ADMIN',
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
