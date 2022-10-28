import "../domains/fetch-polyfill";

import { getToken } from "next-auth/jwt";
import { unstable_getServerSession } from "next-auth/next";
import { authConfig } from "./auth/[...nextauth]";

import { Client } from "twitter-api-sdk";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authConfig);
  const token = await getToken({ req });

  const data = {};

  try {
    const twitter = new Client(token.twitterAccessToken);
    const { data: me } = await twitter.users.findMyUser();
    data.me = me;
    const { data: users } = await twitter.users.usersIdFollowing(me.id);
    data.users = users;
  } catch (error) {
    console.warn(error);
  }

  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
      profile: token.twitterProfile,
      data: data,
    });
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
}
