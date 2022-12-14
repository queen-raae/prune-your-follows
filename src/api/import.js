import "../domains/api/fetch-polyfill";
import { importFollowing, wrapper } from "../domains/api";

export default async function handler(req, res) {
  await wrapper(req, res, {
    POST: async ({ userId, twitterAccessToken }) => {
      res.send(
        await importFollowing({
          userId: userId,
          twitterAccessToken: twitterAccessToken,
        })
      );
    },
  });
}
