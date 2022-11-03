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
  return await actions[action]({
    recordId: `${userId}-${accountId}`,
    userId,
    accountId,
    twitterAccessToken,
  });
}

const actions = {
  hide: async ({ recordId, userId, accountId }) => {
    console.log("PYF POST Account Hide", userId, accountId);

    const record = await xata.db.accounts.createOrUpdate({
      id: recordId,
      hidden: new Date(),
    });

    console.log("PYF POST Account Successfull hide", accountId);

    return record;
  },
  unhide: async ({ recordId, userId, accountId }) => {
    console.log("PYF POST Account Unhide", userId, accountId);

    const record = await xata.db.accounts.createOrUpdate({
      id: recordId,
      hidden: null,
    });

    console.log("PYF POST Account Successfull uhide", accountId);

    return record;
  },
  unfollow: async ({ recordId, userId, accountId, twitterAccessToken }) => {
    console.log("PYF POST Account Unfollow", userId, accountId);

    await xata.db.accounts.createOrUpdate({
      id: recordId,
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
      await xata.db.accounts.createOrUpdate({
        id: recordId,
        // data.following should be true after a successful unfollow,
        // but lets use this return info to be sure
        unfollowed: null,
      });
      throw createError.InternalServerError(error);
    }

    const record = await xata.db.accounts.createOrUpdate({
      id: recordId,
      // data.following should be true after a successful unfollow,
      // but lets use this return info to be sure
      unfollowed: data.following ? null : new Date(),
    });

    console.log("PYF POST Account Successfull unfollow", accountId);

    return record;
  },
};
