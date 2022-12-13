import * as Sentry from "@sentry/node";

let environment = "development";

if (process.env.GATSBY_CLOUD && process.env.BRANCH === "main") {
  environment = "production";
} else if (process.env.GATSBY_CLOUD) {
  environment = "staging";
}

let allowInit = true;

export function initSentry() {
  if (allowInit) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN_FUNCTIONS,
      tracesSampleRate: process.env.SENTRY_SAMPLE_RATE_FUNCTIONS || 0.7,
      environment: environment,
    });
    allowInit = false;
  }
}
