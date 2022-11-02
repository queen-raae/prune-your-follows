import "../domains/api/fetch-polyfill";
import createError from "http-errors";
import Joi from "joi";
import { getToken } from "next-auth/jwt";

import { getAccounts, postAccounts } from "../domains/api";

export default async function handler(req, res) {
  console.log(`${req.baseUrl} - ${req.method}`);

  const token = await getToken({ req });

  if (!token) throw new createError.Unauthorized();

  try {
    if (req.method === "POST") {
      const schema = Joi.object({
        accountId: Joi.string().required(),
        action: Joi.string().valid("hide", "unhide", "unfollow").required(),
      });

      const { value, error: validationError } = schema.validate(req.body);

      if (validationError) {
        throw createError.UnprocessableEntity(validationError);
      }

      res.send(
        await postAccounts({
          ...value,
          twitterAccessToken: token.twitterAccessToken,
          userId: token.sub,
        })
      );
    } else if (req.method === "GET") {
      const schema = Joi.object({
        filter: Joi.string(),
        search: Joi.string(),
      })
        .or("filter", "search")
        .required();

      const { value, error: validationError } = schema.validate(req.query);

      if (validationError) {
        throw createError.UnprocessableEntity(validationError);
      }
      res.send(await getAccounts({ ...value, followerId: token.sub }));
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
