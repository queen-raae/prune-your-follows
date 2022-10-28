import createError from "http-errors";
import { getToken } from "next-auth/jwt";

import { getMeta } from "../domains/api";

export default async function handler(req, res) {
  console.log(`${req.baseUrl} - ${req.method}`);

  const token = await getToken({ req });

  if (!token) throw new createError.Unauthorized();

  try {
    if (req.method === "GET") {
      res.send(await getMeta({ userId: token.sub }));
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
