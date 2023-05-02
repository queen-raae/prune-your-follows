import createError from "http-errors";
import { add, differenceInYears } from "date-fns";
import { getXataClient } from "../xata";
import { fetchTwitterFollowing } from "./twitter";

const xata = getXataClient();

export async function importFollowing({ userId, twitterAccessToken }) {
  const meta = await xata.db.meta.read({
    id: userId,
  });

  const now = new Date();
  const next = meta?.next || now;

  console.log(`PYF Try to import following for ${userId}:`, now, next);

  if (now < next) {
    console.warn(`PYF 429 for ${userId}: Try again at ${next}`);
    throw createError.TooManyRequests();
  }

  // Block imports for the next 5 minutes
  await xata.db.meta.createOrUpdate({
    id: userId,
    next: add(now, { minutes: 5 }),
  });

  // No need to import as Twitter Basic API access does not allow it

  // let nextToken = null;
  // let followingCount = 0;

  // do {
  //   const {
  //     data: following,
  //     meta: twitterMeta,
  //     error,
  //   } = await fetchTwitterFollowing({
  //     userId: userId,
  //     accessToken: twitterAccessToken,
  //     nextToken: nextToken,
  //   });

  //   if (error) {
  //     const next = error.status === 429 ? add(now, { minutes: 15 }) : now;
  //     console.warn(`Twitter ${error.status} for ${userId}: Try again ${next}`);
  //     await xata.db.meta.createOrUpdate({
  //       id: userId,
  //       next: next,
  //     });
  //     throw error;
  //   } else {
  //     nextToken = twitterMeta.next_token;
  //     followingCount += following.length;

  //     const records = following.map((account) => {
  //       const record = transformTwitterAccountToAccountRecord(account);
  //       record.id = `${userId}-${account.id}`;
  //       record.followed_by = userId;
  //       record.last = now;
  //       record.unfollowed = null;
  //       return record;
  //     });

  //     const accountsRecords = await xata.db.accounts.createOrUpdate(records);
  //     console.log(
  //       "PYF Following account records updated:",
  //       accountsRecords.length
  //     );
  //   }
  // } while (nextToken);

  // await xata.db.meta.createOrUpdate({
  //   id: userId,
  //   last: now,
  // });

  // console.log("PYF Imported following", followingCount);
  return "ok";
}

export const transformTwitterAccountToAccountRecord = (account) => {
  const yearsOnTwitter = differenceInYears(
    new Date(),
    new Date(account.created_at)
  );
  const averageTweetsPerYear = Math.floor(
    account.public_metrics.tweet_count / (yearsOnTwitter || 1) // Make sure we are not dividing by 0
  );

  return {
    accountId: account.id,
    username: account.username,
    name: account.name,
    meta: {
      created_at: account.created_at,
      description: account.description,
      location: account.location,
      url: account.url,
      profile_image_url: account.profile_image_url,
    },
    public_metrics: account.public_metrics,
    calculated_metrics: {
      years_on_twitter: yearsOnTwitter,
      average_tweets_per_year: averageTweetsPerYear,
    },
  };
};
