import * as Sentry from "@sentry/node";
import { getToken } from "next-auth/jwt";

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
});

export default async function wrapper(req, res, handlers) {
  const token = await getToken({ req });

  if (!token) throw new createError.Unauthorized();

  Sentry.setUser({ id: token.sub });

  try {
    if (handlers[req.method]) {
      await handlers[req.method]({
        userId: token.sub,
        twitterAccessToken: token.twitterAccessToken,
      });
    } else {
      throw createError.MethodNotAllowed(`${req.method} not allowed`);
    }
  } catch (error) {
    let status = createError.isHttpError(error) ? error.statusCode : 500;
    let message = error.message;

    if (error.name === "TwitterError" && error.status === 429) {
      // Pass through Twitter Rate Limiting
      status = 429;
    } else if (error.requestId) {
      // TODO: Come up with a better check?
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
