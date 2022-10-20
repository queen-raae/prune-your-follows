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

export const fetchMyUser = async ({ accessToken }) => {
  const twitter = new Client(accessToken);

  const result = await twitter.users.findMyUser({
    "user.fields": USER_FIELDS,
  });

  console.log("Fetched My User", result.data.id, result.data.username);

  return result;
};

export const fetchTwitterFollowing = async ({
  userId,
  accessToken,
  nextToken,
}) => {
  const twitter = new Client(accessToken);

  const result = await twitter.users.usersIdFollowing(userId, {
    max_results: 50,
    pagination_token: nextToken,
    "user.fields": USER_FIELDS,
  });

  console.log("Fetched Followers:", result.data.length);
  console.log("Is more", Boolean(result.meta.next_token));

  return result;
};
