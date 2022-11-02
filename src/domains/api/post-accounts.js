import createError from "http-errors";
import { getXataClient } from "../xata";
import { unfollowUser } from "./twitter";

const xata = getXataClient();

export default async function ({
  userId,
  accountId,
  twitterAccessToken,
  action,
}) {
  return await actions[action]({ userId, accountId, twitterAccessToken });
}

const actions = {
  hide: async ({ userId, accountId }) => {
    console.log("Hide", userId, accountId);

    const record = await xata.db.accounts.createOrUpdate({
      id: accountId,
      hidden: new Date(),
    });

    console.log("Successfull hide", accountId);

    return record;
  },
  unhide: async ({ userId, accountId }) => {
    console.log("Unhide", userId, accountId);

    const record = await xata.db.accounts.createOrUpdate({
      id: accountId,
      hidden: null,
    });

    console.log("Successfull uhide", accountId);

    return record;
  },
  unfollow: async ({ userId, accountId, twitterAccessToken }) => {
    console.log("Unfollow", userId, accountId);

    await xata.db.accounts.createOrUpdate({
      id: accountId,
      // data.following should be true after a successful unfollow,
      // but lets use this return info to be sure
      unfollowed: new Date(),
    });

    const { data, error } = await unfollowUser({
      targetUserId: accountId,
      sourceUserId: userId,
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
  },
};
