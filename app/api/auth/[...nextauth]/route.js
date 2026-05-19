import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const { handlers } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
});

export const { GET, POST } = handlers;
