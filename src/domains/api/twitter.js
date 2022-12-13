import { Client } from "twitter-api-sdk";

const USER_FIELDS = [
  "id",
  "created_at",
  "description",
  "url",
  "location",
  "profile_image_url",
  "public_metrics",
  "username",
  "name",
];

const enrichError = (error, endpoint) => {
  error.name = `TwitterError`;
  error.message = `${endpoint}: ${error.statusText}`;
};

export const fetchMyUser = async ({ accessToken }) => {
  try {
    const twitter = new Client(accessToken);

    const result = await twitter.users.findMyUser({
      "user.fields": USER_FIELDS,
    });

    console.log(`Twitter Fetched My User: ${result.data.id}`);

    return result;
  } catch (error) {
    enrichError(error, "findMyUser");
    return { error };
  }
};

export const fetchTwitterFollowing = async ({
  userId,
  accessToken,
  nextToken,
}) => {
  try {
    const twitter = new Client(accessToken);

    const result = await twitter.users.usersIdFollowing(userId, {
      max_results: 1000,
      pagination_token: nextToken,
      "user.fields": USER_FIELDS,
    });

    console.log(
      `Twitter Fetched Followers for ${userId}: ${result.data.length}`
    );
    console.log(
      `Tritter Is more for ${userId}: ${Boolean(result.meta.next_token)}`
    );

    return result;
  } catch (error) {
    enrichError(error, "usersIdFollowing");
    return { error };
  }
};

export const unfollowUser = async ({
  targetUserId,
  sourceUserId,
  accessToken,
}) => {
  const twitter = new Client(accessToken);
  try {
    const data = await twitter.users.usersIdUnfollow(
      //The ID of the user that is requesting to unfollow the target user
      sourceUserId,
      //The ID of the user that the source user is requesting to unfollow
      targetUserId
    );
    return data;
  } catch (error) {
    enrichError(error, "usersIdUnfollow");
    return { error };
  }
};

export const followUser = async ({
  targetUserId,
  sourceUserId,
  accessToken,
}) => {
  const twitter = new Client(accessToken);
  try {
    const data = await twitter.users.usersIdFollow(
      //The ID of the user that is requesting to follow the target user
      sourceUserId,
      //The ID of the user that the source user is requesting to follow
      { target_user_id: targetUserId }
    );
    return data;
  } catch (error) {
    enrichError(error, "usersIdFollow");
    return { error };
  }
};
