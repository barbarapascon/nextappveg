import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      if (account.provider === 'credentials') {
        // Implement your custom username/password authentication here
        const isValidCredentials = customAuthenticationLogic(user.username, user.password);
        if (isValidCredentials) {
          return Promise.resolve(true);
        } else {
          return Promise.resolve(false);
        }
      }
      return Promise.resolve(true);
    },
    async jwt(token, user) {
      if (user) {
        token.id = user.id; // Set the user ID in the JWT token
      }
      return token;
    },
    async session(session, token) {
      session.user = token.id; // Store the user ID in the session
      return session;
    },
  },
});
