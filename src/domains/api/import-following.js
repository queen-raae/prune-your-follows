import { differenceInYears } from "date-fns";
import { getXataClient } from "../xata";
import { fetchTwitterFollowing } from "./twitter";

const xata = getXataClient();

export default async function ({ twitterAccessToken, followerId }) {
  let nextToken = null;
  let followingCount = 0;
  const timestamp = new Date();

  do {
    const { data: following, meta } = await fetchTwitterFollowing({
      userId: followerId,
      accessToken: twitterAccessToken,
      nextToken: nextToken,
    });

    nextToken = meta.next_token;
    followingCount += following.length;

    const accounts = following.map((user) => {
      const account = transformTwitterUserToAccount({ user, timestamp });
      account.followed_by = followerId;
      return account;
    });

    const accountsRecords = await xata.db.accounts.createOrReplace(accounts);
    console.log("Following account records updated:", accountsRecords.length);
  } while (nextToken);

  console.log("Imported following", followingCount);
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
