import { getXataClient } from "../xata";
import { unfollowUser, followUser } from "./twitter";

const xata = getXataClient();

export async function postAccounts({
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
    console.log("PYF: POST Account Hide", userId, accountId);

    const record = await xata.db.accounts.createOrUpdate({
      id: recordId,
      hidden: new Date(),
    });

    console.log("PYF: POST Account Successfull Hide", accountId);

    return record;
  },
  unhide: async ({ recordId, userId, accountId }) => {
    console.log("PYF: POST Account Unhide", userId, accountId);

    const record = await xata.db.accounts.createOrUpdate({
      id: recordId,
      hidden: null,
    });

    console.log("PYF: POST Account Successfull Unhide", accountId);

    return record;
  },
  follow: async ({ recordId, userId, accountId, twitterAccessToken }) => {
    console.log("PYF: POST Account Follow", userId, accountId);

    const original = await xata.db.accounts.read(recordId);
    const now = new Date();

    await xata.db.accounts.createOrUpdate({
      id: recordId,
      unfollowed: null,
      last: now,
    });

    const { data, error } = await followUser({
      targetUserId: accountId,
      sourceUserId: userId,
      accessToken: twitterAccessToken,
    });

    if (error) {
      console.warn(
        "Twitter: Follow failed, rolling back",
        userId,
        accountId,
        error.message,
        original.unfollowed,
        original.last
      );
      await xata.db.accounts.createOrUpdate({
        id: recordId,
        // data.following should be true after a successful unfollow,
        // but lets use this return info to be sure
        unfollowed: original.unfollowed ? original.unfollowed : null,
        last: original.last ? original.last : null,
      });
      throw error;
    }

    const record = await xata.db.accounts.createOrUpdate({
      id: recordId,
      // data.following should be true after a successful follow,
      // but lets use this return info to be sure
      unfollowed: data.following || data.pending_follow ? null : now,
      last: now,
    });

    console.log("PYF: POST Account Successfull Follow", accountId);

    return record;
  },
  unfollow: async ({ recordId, userId, accountId, twitterAccessToken }) => {
    console.log("PYF: POST Account Unfollow", userId, accountId);

    const original = await xata.db.accounts.read(recordId);
    const now = new Date();

    await xata.db.accounts.createOrUpdate({
      id: recordId,
      unfollowed: new Date(),
      last: now,
    });

    const { data, error } = await unfollowUser({
      targetUserId: accountId,
      sourceUserId: userId,
      accessToken: twitterAccessToken,
    });

    if (error) {
      console.warn(
        "Twitter: Unfollow failed, rolling back",
        userId,
        accountId,
        error.message,
        original.unfollowed,
        original.last
      );
      await xata.db.accounts.createOrUpdate({
        id: recordId,
        unfollowed: original.unfollowed ? original.unfollowed : null,
        last: original.last ? original.last : null,
      });
      throw error;
    }

    const record = await xata.db.accounts.createOrUpdate({
      id: recordId,
      // data.following should be false after a successful unfollow,
      // but lets use this return info to be sure
      unfollowed: data.following ? null : now,
      last: now,
    });

    console.log("PYF: POST Account Successfull Unfollow", accountId);

    return record;
  },
};
