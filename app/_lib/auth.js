import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getCliente, createCliente } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },

    async signIn({ user, account, profile }) {
      try {
        const clienteExistente = await getCliente(user.email);

        if (!clienteExistente) {
          await createCliente({
            email: user.email,
            fullName: user.name,
          });
        }

        return true;
      } catch (error) {
        console.error("Erro durante o signIn:", error);
        return false;
      }
    },
    async session({ session, user }) {
      const cliente = await getCliente(session.user.email);
      session.user.clienteId = cliente.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
