import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { Client } from "twitter-api-sdk";

export const authConfig = {
  // Configure one or more authentication providers
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log("jwt callback");
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }

      if (profile) {
        token.profile = profile.data;
      }

      // Persist the info on user when isNewUser
      if (profile && token.accessToken) {
        try {
          const twitter = new Client(token.accessToken);
          const { data: me } = await twitter.users.findMyUser({
            "user.fields": ["public_metrics"],
          });
          token.profile.public_metrics = me.public_metrics;
        } catch (error) {
          console.warn("Could not fetch user info for new user", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      console.log("session callback");
      session.user = {
        ...session.user,
        ...token.profile,
      };
      return session;
    },
  },
};

export default async function handler(req, res) {
  req.query.nextauth = req.params.nextauth.split("/");
  return await NextAuth(req, res, authConfig);
}
