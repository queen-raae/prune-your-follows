import createError from "http-errors";

import {
  serviceSupabase,
  supabase as nonServiceSupabase,
} from "../api-utils/supabaseClient";

export default async function handler(req, res) {
  try {
    console.log(`${req.baseUrl} - ${req.method}`);

    if (req.method === "GET") {
      const result = await serviceSupabase
        .from("public_profiles")
        .select()
        .limit(10);
      console.log({ result });
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
