import createError from "http-errors";
import { add, differenceInYears } from "date-fns";
import { getXataClient } from "../xata";
import { fetchMyUser, fetchTwitterFollowing } from "./twitter";

const xata = getXataClient();

export default async function ({ twitterAccessToken }) {
  const { data: user, error } = await fetchMyUser({
    accessToken: twitterAccessToken,
  });

  if (error) {
    throw createError.InternalServerError(error);
  }

  const meta = await xata.db.meta.read({
    id: user.id,
  });

  const now = new Date();
  const next = meta?.next || now;

  console.log(`PYF Try to import following for ${user.id}:`, now, next);

  if (now < next) {
    const message = `PYF 429 for ${user.id}: Try again at ${meta?.next}`;
    throw createError.TooManyRequests(message);
  }

  // Block imports for the next 5 minutes
  await xata.db.meta.createOrUpdate({
    id: user.id,
    next: add(now, { minutes: 5 }),
  });

  let nextToken = null;
  let followingCount = 0;

  do {
    const {
      data: following,
      meta: twitterMeta,
      error,
    } = await fetchTwitterFollowing({
      userId: user.id,
      accessToken: twitterAccessToken,
      nextToken: nextToken,
    });

    if (error?.status === 429) {
      const next = add(now, { minutes: 15 });
      const message = `Twitter 429 for ${user.id}: Try again at ${next}`;
      console.warn(message);
      await xata.db.meta.createOrUpdate({
        id: user.id,
        next: next,
      });
      throw createError.TooManyRequests(`Try again at ${next}`);
    } else if (error) {
      const next = now;
      const message = `Twitter ${error.status} for ${user.id}`;
      console.warn(message);
      await xata.db.meta.createOrUpdate({
        id: user.id,
        next: now,
      });
      throw createError.InternalServerError(`Try again at ${next}`);
    } else {
      nextToken = twitterMeta.next_token;
      followingCount += following.length;

      const records = following.map((account) => {
        const record = transformTwitterAccountToAccountRecord(account);
        record.id = `${user.id}-${account.id}`;
        record.followed_by = user.id;
        record.last = now;
        return record;
      });

      const accountsRecords = await xata.db.accounts.createOrReplace(records);
      console.log(
        "PYF Following account records updated:",
        accountsRecords.length
      );
    }
  } while (nextToken);

  await xata.db.meta.createOrUpdate({
    id: user.id,
    last: now,
  });

  console.log("PYF Imported following", followingCount);
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
