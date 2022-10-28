const createUserAvatarNodes = async (gatsbyUtils) => {
  // TODO: Remake with Xata
};

exports.sourceNodes = async (gatsbyUtils) => {
  const { reporter } = gatsbyUtils;

  reporter.verbose("Sourcing user avatars - START");
  await createUserAvatarNodes(gatsbyUtils);
  reporter.verbose("Sourcing user avatars - DONE");
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type UserAvatar implements Node {
      username: String!
      avatarUrl: String!
    }
  `;
  createTypes(typeDefs);
};
