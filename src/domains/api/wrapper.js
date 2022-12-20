import createError from "http-errors";
import Joi from "joi";
import * as Sentry from "@sentry/node";
import { getToken } from "next-auth/jwt";
import { fetchMyUser } from "./twitter";

let environment = "development";

if (process.env.GATSBY_CLOUD && process.env.BRANCH === "main") {
  environment = "production";
} else if (process.env.GATSBY_CLOUD) {
  environment = "staging";
}

Sentry.init({
  dsn: process.env.SENTRY_DSN_FUNCTIONS,
  tracesSampleRate: process.env.SENTRY_SAMPLE_RATE_FUNCTIONS || 0.7,
  environment: environment,
  integrations: (defaults) => {
    if (environment === "development") {
      // Hack to solve memory issues in dev
      return defaults.filter((integration) => integration.name !== "Http");
    } else {
      return defaults;
    }
  },
});

export async function wrapper(req, res, handlers) {
  try {
    let userId = "";
    let twitterAccessToken = "";

    const token = await getToken({ req });

    if (token) {
      userId = token.sub;
      twitterAccessToken = token.twitterAccessToken;
    } else {
      const schema = Joi.object({
        twitterAccessToken: Joi.string().required(),
      }).required();

      const { value, error: validationError } = schema.validate(req.body);

      if (validationError) {
        throw new createError.Unauthorized();
      }

      twitterAccessToken = value.twitterAccessToken;

      const { data: user, error } = await fetchMyUser({
        accessToken: twitterAccessToken,
      });

      if (error) {
        throw error;
      }

      userId = user.id;
    }

    Sentry.setUser({ id: userId });

    if (handlers[req.method]) {
      await handlers[req.method]({
        userId: userId,
        twitterAccessToken: twitterAccessToken,
      });
    } else {
      throw createError.MethodNotAllowed(`${req.method} not allowed`);
    }
  } catch (error) {
    const isHttpError = createError.isHttpError(error);
    let status = isHttpError ? error.statusCode : 500;
    let message = isHttpError && error.expose ? error.message : "";
    let messageForUser = "";
    let code = status;
    const tags = {};

    if (error.name === "TwitterResponseError") {
      // Pass through Twitter Rate Limiting
      status = error.status;
      message = error.message;
      messageForUser =
        error.error?.errors?.[0]?.message &&
        `Twitter says "${error.error?.errors?.[0]?.message}"`;

      if (error.status === 429) {
        // Distinguish between app and user rate limiting
        const limitRemaining = error.headers?.["x-rate-limit-remaining"];
        tags["twitter.limitRemaining"] = limitRemaining;
        code = status + "-TU";
        if (parseInt(limitRemaining) !== 0) {
          code = status + "-TA";
          error.message = `${error.message} (App)`;
        }
      }

      tags["twitter.statusText"] = error.statusText;
      tags["twitter.endpoint"] = error.endpoint;
    } else if (error.requestId) {
      // TODO: Come up with a better check?
      error.name = "XataError";
    }

    tags["request.endpoint"] = req.originalUrl;
    tags["request.method"] = req.method;
    tags["response.message"] = message;
    tags["response.status"] = status;

    console.error(
      `${req.method} ${req.originalUrl} ${status} -`,
      error.message
    );

    Sentry.captureException(error, {
      tags: tags,
      extra: {
        error: error,
        errorAsText: JSON.stringify(error, null, 2),
      },
    });

    // Respond with error code and message
    res.status(status).json({
      message: message,
      messageForUser: messageForUser,
      code: code,
    });
  }
}
