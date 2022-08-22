import createError from "http-errors";

import { serviceSupabase } from "../api-utils/supabaseClient";

export default async function handler(req, res) {
  try {
    console.log(`${req.baseUrl} - ${req.method}`);

    if (req.method === "POST") {
      const profilesResult = await serviceSupabase
        .from("public_profiles")
        .select()
        .limit(10);

      if (profilesResult.data) {
        console.log("Got public profiles", profilesResult.data.length);
      } else {
        console.warn("Error public profiles", profilesResult.error.message);
      }

      const userResult = await serviceSupabase.auth.getUser(
        req.body.accessToken
      );

      if (userResult.data) {
        console.log("Got user", userResult.data);
      } else {
        console.warn("Error user", userResult.error.message);
      }

      res.json(profilesResult.data || profilesResult.error);
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
