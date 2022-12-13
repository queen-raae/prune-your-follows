import "../domains/api/fetch-polyfill";
import createError from "http-errors";
import Joi from "joi";
import * as Sentry from "@sentry/node";
import { getToken } from "next-auth/jwt";

import { getAccounts, postAccounts, initSentry } from "../domains/api";

initSentry();

export default async function handler(req, res) {
  const token = await getToken({ req });

  if (!token) throw new createError.Unauthorized();

  Sentry.setUser({ id: token.sub });

  try {
    if (req.method === "POST") {
      const schema = Joi.object({
        accountId: Joi.string().required(),
        action: Joi.string()
          .valid("hide", "unhide", "unfollow", "follow")
          .required(),
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
        offset: Joi.number().default(0),
        size: Joi.number().default(24),
      })
        .or("filter", "search")
        .required();

      const { value, error: validationError } = schema.validate(req.query);

      if (validationError) {
        throw createError.UnprocessableEntity(validationError);
      }

      res.send(await getAccounts({ ...value, userId: token.sub }));
    } else {
      throw createError(405, `${req.method} not allowed`);
    }
  } catch (error) {
    let status = createError.isHttpError(error) ? error.statusCode : 500;
    let message = error.message;

    if (error.name === "TwitterError" && error.status === 429) {
      // Pass through Twitter Rate Limiting
      status = 429;
    } else if (error.requestId) {
      error.name = "XataError";
    }

    Sentry.captureException(error, {
      extra: {
        error: error,
        errorAsText: JSON.stringify(error, null, 2),
      },
    });

    console.error(`${status} -`, message);

    // Respond with error code and message
    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}`,
    });
  }
}
