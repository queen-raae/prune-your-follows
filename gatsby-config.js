require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Prune your follows`,
    tagline: `Let's prune your follows!`,
    description: `Find Twitter accounts to unfollow and make room for new follows.`,
    url: "https://prune.raae.tech",
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
      resolve: "@raae/gatsby-plugin-svg-emoji-favicon",
      options: {
        emoji: "⚔️",
      },
    },
  ],
};
