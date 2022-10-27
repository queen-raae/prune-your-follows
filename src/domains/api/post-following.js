import createError from "http-errors";
import { getXataClient } from "../xata";
import { unfollowUser } from "./twitter";

const xata = getXataClient();

export default async function ({ followerId, accountId, twitterAccessToken }) {
  console.log("Unfollow", followerId, accountId);

  const { data, error } = await unfollowUser({
    targetUserId: accountId,
    sourceUserId: followerId,
    accessToken: twitterAccessToken,
  });

  if (error) {
    throw createError.InternalServerError(error);
  }

  const record = await xata.db.accounts.createOrUpdate({
    id: accountId,
    // data.following should be true after a successful unfollow,
    // but lets use this return info to be sure
    unfollowed: data.following ? null : new Date(),
  });

  console.log("Successfull unfollow", accountId);

  return record;
}
