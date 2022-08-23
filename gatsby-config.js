module.exports = {
  siteMetadata: {
    title: `Prune your follows`,
    tagline: `Let's prune your follows!`,
    description: `Find Twitter accounts to unfollow and make room for new follows.`,
    url: "https://prune.raae.tech",
  },
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
        includedDomains: `prune.raae.tech`,
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
