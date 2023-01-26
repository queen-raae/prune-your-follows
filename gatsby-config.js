require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

let environment = "development";

if (process.env.GATSBY_CLOUD && process.env.BRANCH === "main") {
  environment = "production";
} else if (process.env.GATSBY_CLOUD) {
  environment = "staging";
}

module.exports = {
  siteMetadata: {
    title: `Prune your follows`,
    tagline: `Let's prune your follows!`,
    description: `Find Twitter accounts to unfollow and make room for new follows.`,
    url:
      environment === "development"
        ? "http://localhost:8000"
        : "https://pruneyourfollows.com",
  },
  trailingSlash: "always",
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `@raae/gatsby-plugin-fathom`,
      options: {
        site: "LFDKNTLD",
        includedDomains: `pruneyourfollows.com`,
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /.svg$/,
        },
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: "UserAvatar",
        imagePath: "avatarUrl",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Prune Your Follows`,
        short_name: `Prune`,
        start_url: `/app`,
        background_color: `#f0fdf4`,
        theme_color: `#65a30d`,
        display: `standalone`,
        icon: `src/domains/common/icons8-cut.svg`,
      },
    },
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn: process.env.SENTRY_DSN,
        tracesSampleRate: process.env.SENTRY_SAMPLE_RATE || 0.7,
        environment: environment,
        release: process.env.COMMIT_REF,
      },
    },
    {
      resolve: `gatsby-plugin-gatsby-cloud`,
      options: {
        headers: {
          "/*": ["Referrer-Policy: strict-origin-when-cross-origin"],
        },
      },
    },
  ],
};
