import createError from "http-errors";
import { getToken } from "next-auth/jwt";

import { getFollowing, importFollowing } from "../domains/api";

export default async function handler(req, res) {
  console.log(`${req.baseUrl} - ${req.method}`);

  try {
    const token = await getToken({ req });

    if (!token) throw new createError.Unauthorized();

    if (req.method === "POST") {
      await importFollowing({
        twitterAccessToken: token.twitterAccessToken,
        followerId: token.sub,
      });
      res.send("ok");
    } else if (req.method === "GET") {
      const result = await getFollowing({
        followerId: token.sub,
        ...req.query,
      });
      res.send(result);
    } else {
      throw createError(405, `${req.method} not allowed`);
    }
  } catch (error) {
    const status =
      error.response?.status || error.status || error.statusCode || 500;
    const message =
      error.response?.data?.message || error.message || error.statusText;

    // Something went wrong, log it
    // console.error(error);
    console.error(`${status} -`, message);

    // Respond with error code and message
    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}`,
    });
  }
}
