module.exports = {
  siteMetadata: {
    title: `Prune your follows`,
    description: `Need to prune who you follow on Twitter? Look no further!`,
    tagline: `Let's prune your follows ⚔️`,
    siteUrl: `https://www.pruneyourfollow.raae.tech`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
  ],
};
