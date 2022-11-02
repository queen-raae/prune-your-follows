import createError from "http-errors";
import { add, differenceInYears, parseISO } from "date-fns";
import { getXataClient } from "../xata";
import { fetchMyUser, fetchTwitterFollowing } from "./twitter";

const xata = getXataClient();

export default async function ({ twitterAccessToken }) {
  const { data: follower, error } = await fetchMyUser({
    accessToken: twitterAccessToken,
  });

  if (error) {
    throw createError.InternalServerError(error);
  }

  console.log(`Import following for: ${follower.username}`);

  const meta = await xata.db.meta.read({
    id: follower.id,
  });

  const now = new Date();
  const next = parseISO(meta?.next);

  if (now <= next) {
    throw createError.TooManyRequests(`Try again at ${meta?.next}`);
  }

  // Block imports for the next 5 minutes
  await xata.db.meta.createOrUpdate({
    id: follower.id,
    next: add(now, { minutes: 5 }),
  });

  let nextToken = null;
  let followingCount = 0;

  do {
    const {
      data: following,
      meta,
      error,
    } = await fetchTwitterFollowing({
      userId: follower.id,
      accessToken: twitterAccessToken,
      nextToken: nextToken,
    });

    if (error?.status === 429) {
      const next = add(now, { minutes: 15 });
      const message = `Twitter 429 for ${follower.id}: Try again at ${next}`;
      console.warn(message);
      await xata.db.meta.createOrUpdate({
        id: follower.id,
        next: next,
      });
      throw createError.TooManyRequests(`Try again at ${next}`);
    } else if (error) {
      const next = now;
      const message = `Twitter ${error.status} for ${follower.id}`;
      console.warn(message);
      await xata.db.meta.createOrUpdate({
        id: follower.id,
        next: now,
      });
      throw createError.InternalServerError(`Try again at ${next}`);
    } else {
      nextToken = meta.next_token;
      followingCount += following.length;

      const accounts = following.map((user) => {
        const account = transformTwitterUserToAccount({ user, timestamp: now });
        account.followed_by = follower.id;
        return account;
      });

      const accountsRecords = await xata.db.accounts.createOrReplace(accounts);
      console.log("Following account records updated:", accountsRecords.length);
    }
  } while (nextToken);

  await xata.db.meta.createOrUpdate({
    id: follower.id,
    last: now,
  });

  console.log("Imported following", followingCount);
  return "ok";
}

export const transformTwitterUserToAccount = ({ user, timestamp }) => {
  const yearsOnTwitter = differenceInYears(
    new Date(),
    new Date(user.created_at)
  );
  const averageTweetsPerYear = Math.floor(
    user.public_metrics.tweet_count / (yearsOnTwitter || 1) // Make sure we are not dividing by 0
  );

  return {
    id: user.id,
    username: user.username,
    name: user.name,
    timestamp: timestamp,
    meta: {
      created_at: user.created_at,
      description: user.description,
      location: user.location,
      url: user.url,
      profile_image_url: user.profile_image_url,
    },
    public_metrics: user.public_metrics,
    calculated_metrics: {
      years_on_twitter: yearsOnTwitter,
      average_tweets_per_year: averageTweetsPerYear,
    },
  };
};
