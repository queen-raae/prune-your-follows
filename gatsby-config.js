module.exports = {
  siteMetadata: {
    title: `Prune your follows`,
    description: `Need to prune who you follow on Twitter? Look no further!`,
    tagline: `Let's prune your follows ⚔️`,
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
