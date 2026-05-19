export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
};
