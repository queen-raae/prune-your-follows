import { differenceInMinutes, differenceInYears, formatISO } from "date-fns";
import createError from "http-errors";
import Joi from "joi";

import { supabase } from "./utils/supabaseClient";
import { twitter } from "./utils/twitterClient";

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
    const message = error.response?.data?.message || error.message;

    // Something went wrong, log it
    console.error(`${status} -`, message);

    // Respond with error code and message
    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}`,
    });
  }
}

const updateProfile = async ({ user, timestamp, status }) => {
  const { error } = await supabase.from("profiles").upsert({
    user_id: user.id,
    timestamp: timestamp,
    status: status,
  });

  if (error) throw createError(500, error);
};

const populateFollowing = async (req, res) => {
  // 1. Validate the data coming in
  const schema = Joi.object({
    accessToken: Joi.string().required(),
  }).required();

  const { value, error: validationError } = schema.validate(req.query);

  if (validationError) throw createError(422, validationError);

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(value.accessToken);

    if (authError) throw createError(401, authError);

    console.log("Fetch profile for user", user.id);

    const {
      data: profile,
      error: profileError,
      status,
    } = await supabase
      .from("profiles")
      .select()
      .eq("user_id", user.id)
      .single();

    if (profileError && status !== 406) throw createError(500, profileError);

    console.log("Last fetched following", profile?.fetched_following);

    const now = new Date();
    const timestamp = new Date(profile?.timestamp);

    if (
      profile.status === "FETCHED" &&
      differenceInMinutes(now, timestamp) < 15
    ) {
      throw createError(429, "It's been less than 15 minutes since last time");
    }

    console.log("Update last fetched following", now);

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
      const { data: accounts, meta } = await twitter.users.usersIdFollowing(
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
        });
      });

      const { error: usersError } = await supabase
        .from("accounts")
        .upsert(accounts);

      const { error: followsError } = await supabase
        .from("follows")
        .upsert(twitterFollows);

      if (usersError || followsError) {
        await updateProfile({
          user: user,
          timestamp: formatISO(now),
          status: "ERROR",
        });
        throw createError(500, usersError || followsError);
      } else {
        await updateProfile({
          user: user,
          timestamp: formatISO(now),
          status: "FETCHED",
        });
      }
    } while (nextToken);

    res.send("ok");
  } catch (error) {
    throw error;
  }
};
