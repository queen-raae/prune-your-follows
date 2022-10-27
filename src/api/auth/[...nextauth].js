import axios from "axios";
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
      authorization: {
        params: {
          scope: "users.read tweet.read follows.read",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.twitterAccessToken = account.access_token;

        axios.post(
          process.env.NEXTAUTH_URL + "/api/import",
          {
            twitterAccessToken: account.access_token,
          },
          //All statuses are valid, we are just kicking this off
          { validateStatus: (status) => !!status }
        );
      }

      if (profile) {
        token.twitterProfile = profile.data;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token.twitterProfile,
      };
      return session;
    },
  },
};

export default async function handler(req, res) {
  req.query.nextauth = req.params.nextauth.split("/");
  return await NextAuth(req, res, authConfig);
}
