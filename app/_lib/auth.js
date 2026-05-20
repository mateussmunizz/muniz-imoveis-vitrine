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
        console.error("ERRO NO SIGNIN (Falha ao comunicar com BD):", error);
        return false;
      }
    },

    async session({ session, user }) {
      try {
        const cliente = await getCliente(session.user.email);

        if (cliente && cliente.id) {
          session.user.clienteId = cliente.id;
        }

        return session;
      } catch (error) {
        console.error("ERRO NA SESSÃO (Falha ao buscar ID):", error);

        return session;
      }
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
