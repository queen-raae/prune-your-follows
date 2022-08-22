import { differenceInMinutes, differenceInYears, formatISO } from "date-fns";
import createError from "http-errors";
import Joi from "joi";

import { serviceSupabase as supabase } from "../api-utils/supabaseClient";
import { twitter } from "../api-utils/twitterClient";

export default async function handler(req, res) {
  console.log(`${req.baseUrl} - ${req.method}`);

  try {
    if (req.method === "GET") {
      await populateFollowing(req, res);
    } else {
      throw createError(405, `${req.method} not allowed`);
    }
  } catch (error) {
    const status = error.response?.status || error.statusCode || 500;
    const message =
      error.response?.data?.message || error.message || error.statusText;

    // Something went wrong, log it
    console.error(`${status} -`, message);

    // Respond with error code and message
    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}`,
    });
  }
}

const updateProfile = async ({ user, timestamp, status }) => {
  console.log("Upsert profile", user.id, timestamp, status);

  const { error } = await supabase.from("profiles").upsert({
    user_id: user.id,
    timestamp: timestamp,
    last_fetched: status === "FETCHED" ? timestamp : undefined,
    status: status,
  });

  if (error) throw createError(500, error);
};

const getProfile = async ({ user }) => {
  console.log("Fetch profile", user.id);

  const { data, error, status } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", user.id)
    .single();

  if (error && status !== 406) throw createError(500, error);

  console.log("Fetched profile", data);

  return data;
};

const updatePublicProfile = async ({ user }) => {
  console.log("Upsert public profile", user.user_metadata.user_name);

  const { error } = await supabase.from("public_profiles").upsert({
    user_id: user.id,
    avatar_url: user.user_metadata.avatar_url,
    username: user.user_metadata.user_name,
  });

  if (error) {
    console.warn("Could not upsert public profile", error.message);
  }
};

const allowPopulate = async ({ user, now }) => {
  const profile = await getProfile({ user });

  const lastFetched = new Date(profile?.last_fetched);
  const lastFetchedDifference = differenceInMinutes(now, lastFetched);
  const timestamp = new Date(profile?.timestamp);
  const lastTimestampDifference = differenceInMinutes(now, timestamp);

  if (profile.status === "FETCHED" && lastFetchedDifference < 5) {
    throw createError(405, "It's been less than 5 minutes since last time", {
      skipped: true,
    });
  } else if (profile.status === "RATE_LIMIT" && lastTimestampDifference < 15) {
    throw createError(405, "It's been less than 15 minutes since rate limit", {
      skipped: true,
    });
  } else if (profile.status === "FETCHING") {
    throw createError(405, "It's already fetching", { skipped: true });
  } else {
    console.log("Allow populate");
  }
};

const fetchTwitterFollowing = async ({ user, nextToken }) => {
  try {
    const result = await twitter.users.usersIdFollowing(
      user.user_metadata.sub,
      {
        max_results: 1000,
        pagination_token: nextToken,
        "user.fields": [
          "id",
          "created_at",
          "description",
          "url",
          "location",
          "profile_image_url",
          "public_metrics",
          "username",
        ],
      }
    );
    return result;
  } catch (error) {
    throw createError(error);
  }
};

const populateFollowing = async (req, res) => {
  // 1. Validate the data coming in
  const schema = Joi.object({
    accessToken: Joi.string().required(),
  }).required();

  const { value, error: validationError } = schema.validate(req.query);

  if (validationError) throw createError(422, validationError);

  const now = new Date();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(value.accessToken);

  if (authError) throw createError(401, authError);

  try {
    await updatePublicProfile({ user });

    await allowPopulate({ user, now });

    await updateProfile({
      user: user,
      timestamp: formatISO(now),
      status: "FETCHING",
    });

    console.log(
      "Fetch followers for Twitter user:",
      user.user_metadata.user_name,
      user.user_metadata.sub
    );

    let nextToken = null;

    do {
      const { data: accounts, meta } = await fetchTwitterFollowing({
        user,
        nextToken,
      });

      console.log("Fetched followers:", accounts.length);
      console.log("Is more", Boolean(meta.next_token));
      nextToken = meta.next_token;

      const twitterFollows = [];

      accounts.forEach((account) => {
        account.description = account.description || "";
        account.location = account.location || "";
        account.url = account.url || "";
        account.profile_image_url = account.profile_image_url || "";
        account.followers_count = account.public_metrics.followers_count;
        account.following_count = account.public_metrics.following_count;
        account.tweet_count = account.public_metrics.tweet_count;
        account.listed_count = account.public_metrics.listed_count;

        delete account.public_metrics;

        account.age = differenceInYears(
          new Date(),
          new Date(account.created_at)
        );
        account.average_tweets_per_year = Math.floor(
          account.tweet_count / (account.age || 1) // Make sure we are not dividing by 0
        );

        twitterFollows.push({
          user_id: user.id,
          follows_twitter_id: account.id,
          updated_at: formatISO(now),
        });
      });

      const { error: usersError } = await supabase
        .from("accounts")
        .upsert(accounts);

      const { error: followsError } = await supabase
        .from("follows")
        .upsert(twitterFollows);

      if (usersError || followsError) {
        throw createError(500, usersError || followsError);
      }
    } while (nextToken);

    await updateProfile({
      user: user,
      timestamp: formatISO(now),
      status: "FETCHED",
    });

    res.send("ok");
  } catch (error) {
    console.warn("Error:", error.status, error.statusText, error.message);
    if (error.status === 429) {
      await updateProfile({
        user: user,
        timestamp: formatISO(now),
        status: "RATE_LIMIT",
      });
    } else if (!error.skipped) {
      await updateProfile({
        user: user,
        timestamp: formatISO(now),
        status: "ERROR",
      });
    }

    throw error;
  }
};
