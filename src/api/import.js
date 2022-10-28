import "../domains/fetch-polyfill";
import createError from "http-errors";
import Joi from "joi";

import { importFollowing } from "../domains/api";

export default async function handler(req, res) {
  console.log(`${req.baseUrl} - ${req.method}`);

  try {
    if (req.method === "POST") {
      const schema = Joi.object({
        twitterAccessToken: Joi.string().required(),
      }).required();

      const { value, error: validationError } = schema.validate(req.body);

      if (validationError) {
        throw createError(422, validationError);
      }

      res.send(await importFollowing(value));
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
